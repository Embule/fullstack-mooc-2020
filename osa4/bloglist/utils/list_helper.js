var _ = require('lodash');

const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length != 0) {
    const max = blogs.reduce(function (prev, current) {
      return (prev.likes > current.likes) ? prev : current
    })
    return max.title
  } else {
    return 'Bloglist empty'
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authors = []
  blogs.forEach(blog => {
    authors.push(blog.author)
  })

  const authorsWithNumbers = authors.reduce((accumulator, value) => {
    accumulator[value] = (accumulator[value] || 0) + 1

    return accumulator
  }, {})
  const numberOfBlogs = Object.values(authorsWithNumbers);
  const maxAuthor = Object.keys(authorsWithNumbers).reduce((a, b) =>
    authorsWithNumbers[a] > authorsWithNumbers[b] ? a : b)

  const authorWithMostBlogs = { author: maxAuthor, blogs: Math.max(...numberOfBlogs) }

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}