import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, user, handleLogout, createBlog, addLike }) => {
  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

  return (
    <div>
      <h2>blogs</h2>
      <h4>{user.name} is logged in</h4>
      <button onClick={handleLogout}>Logout</button><br />
      <Togglable buttonLabel='Create new blog'>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      <br />
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired
}


export default Blogs