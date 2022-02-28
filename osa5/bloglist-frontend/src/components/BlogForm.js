import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={createNewBlog}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input type='text'
            id='title'
            value={title}
            name={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor='author'>
            Author: </label>
          <input type='text'
            id='author'
            value={author}
            name={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input type='text'
            id='url'
            value={url}
            name={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div >
        <input type='submit' value='Create new' />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm