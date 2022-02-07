const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
  } catch (e) {
    throw e
  }
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const likes = !body.likes ? 0 : body.likes

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      ...body,
      likes: likes,
      user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    throw e
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const isUserAuthorized = blog.user.toString() === user.id.toString()

    if (!(request.token || isUserAuthorized)) {
      return response.status(404).json({ error: 'not authorized' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    throw e
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  try {
    const blog = {
      ...body
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog).end()
  } catch (e) {
    throw e
  }
})

module.exports = blogRouter