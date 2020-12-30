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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}