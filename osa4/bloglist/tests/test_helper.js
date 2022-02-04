const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogToAdd = {
  title: 'Groundhog day',
  author: 'Hemuli',
  likes: 1002013,
  important: true,
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: "test",
    author: "Nietzsche",
    url: "www.facebook.com",
    likes: 1
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogToAdd,
  nonExistingId,
  blogsInDb,
  usersInDb
}