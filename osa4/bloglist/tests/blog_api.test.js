const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "01.12.2020",
    author: "John Smith",
    url: "www.facebook.com",
    likes: 57
  },
  {
    title: "My Day",
    author: "Katti Lallinen",
    url: "www.github.com",
    likes: 8
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are one blog posts', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

afterAll(() => {
  mongoose.connection.close()
})