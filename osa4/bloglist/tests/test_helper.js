const Blog = require('../models/blog')

const initialBlogs = [
    {
        // id: 1,
        title: "01.12.2020",
        author: "John Smith",
        url: "www.facebook.com",
        likes: 57
    },
    {
        // id: 2,
        title: "My Day",
        author: "Katti Lallinen",
        url: "www.github.com",
        likes: 8
    },
]

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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}