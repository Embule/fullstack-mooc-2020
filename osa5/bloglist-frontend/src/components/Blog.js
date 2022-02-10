import React, { useState } from 'react'
const Blog = ({ blog, addLike }) => {
  const titleStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    display: 'inline-block',
    fontSize: '18px'
  }
  const buttonStyle = {
    border: '2px solid #4CAF50',
    padding: '4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
    margin: '4px 4px',
    borderRadius: '8px'
  }

  const detailsStyle = {
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    padding: '8px',
    width: 'fit-content'
  }

  const [isDetailsShowing, setIsDetailsShowing] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleShowInfoButton = () => {
    setIsDetailsShowing(!isDetailsShowing)
  }

  const handleAddLike = () => {
    const newLike = {
      id: blog.id,
      body: {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      }
    }
    addLike(newLike)
    setLikes(likes)
  }

  const showDetails = () => (
    <div style={detailsStyle}>
      <div>{blog.url}</div>

      <div>{blog.author}</div>
      <div>{likes}
        <button style={buttonStyle} onClick={handleAddLike}>Like</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={titleStyle}> {blog.title}</div>
      <button style={buttonStyle} onClick={toggleShowInfoButton}>
        {isDetailsShowing ? 'Hide' : 'View'}
      </button>
      {isDetailsShowing ? showDetails() : null}
    </div>
  )
}

export default Blog