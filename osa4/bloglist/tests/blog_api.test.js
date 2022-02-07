const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token;
const user = {
  username: 'Katti',
  name: 'Katti Lallinen',
  password: 'secreTtest9',
}

beforeAll(async () => {
  await api
    .post('/api/users')
    .send(user)

  const response = await api.post('/api/login').send(user);
  token = response.body.token;
});

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.author)

    expect(contents).toContain(
      'Katti Lallinen'
    )
  })

  test('returned blogs have valid id property', async () => {
    const response = await api
      .get(`/api/blogs`)
      .expect(200)

    const blogs = response.body

    blogs.forEach(blog =>
      expect(blog.id).toBeDefined())
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('adding a new blog post', () => {
  test('a valid blog can be added ', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogToAdd)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.author)
    expect(contents).toContain(
      'Katti Lallinen'
    )
  })

  test('if number of title and url are missing POST fails with code 400 ', async () => {
    const blogToAdd = {
      author: 'Hemuli',
      important: true,
    }

    const blogsAtStart = await helper.blogsInDb()

    const response = await api
      .post('/api/blogs')
      .send(blogToAdd)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    expect(response.body.error).toContain("Blog validation failed: url: Path `url` is required., title: Path `title` is required.")

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('if number of likes is not given, will return them as 0 ', async () => {
    const blogToAdd = {
      title: 'Groundhog day',
      author: 'Hemuli',
      url: 'www.moi.net',
      important: true,
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToAdd)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    expect(response.body.likes).toEqual(0)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2)

    blogsAtEnd.forEach(n => expect(n.likes).toBeDefined())
  })

  test('fails with status code 401 if author property is missing ', async () => {
    const newBlog = {
      title: "test2",
      url: "www.facebok.com",
      likes: 1
    }
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('adding blog fails with 401 if token is missing ', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(helper.blogToAdd)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('deleting blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const contents = blogsAtEnd.map(blog => blog.url)

    expect(contents).not.toContain(blogToDelete.url)
  })
})

describe('Updating blogs', () => {
  test('succeeds with status code 200 if blog is updated', async () => {
    await Blog.insertMany(helper.initialBlogs)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = {
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toEqual(100);
  })
})

afterAll(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  mongoose.connection.close()
})