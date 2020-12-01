const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogRouter.post('/', (request, response) => {
  const body = request.body

  const blog = new Blog({
    content: body.content,
    date: new Date()
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter