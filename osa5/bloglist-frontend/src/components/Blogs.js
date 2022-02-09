import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, user, handleLogout, createMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      blogService.create(newBlog)
      createMessage(`A new blog, ${title} by ${author} was added!`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      createMessage('Something went wrong while adding a new blog')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <h4>{user.name} is logged in</h4>
      <button onClick={handleLogout}>Logout</button><br />
      <h3>Create new blog</h3>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          Title: <input type='text'
            value={title}
            name={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author: <input type='text'
            value={author}
            name={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url: <input type='text'
            value={url}
            name={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div >
        <input type='submit' value='Create new' />
      </form>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs