import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createMessage = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      createMessage(`Welcome ${user.name}!`)
    } catch (exception) {
      createMessage('Wrong username or passowrd')
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogService.create(blogObject)
      createMessage(`A new blog, ${blogObject.title} by ${blogObject.author} was added!`)
    } catch (exception) {
      createMessage('Something went wrong while adding a new blog')
    }
  }

  const addLike = (likeObject) => {
    try {
      blogService.update(likeObject.id, likeObject.body)
      createMessage(`Added a like to ${likeObject.title}`)
    } catch (e) {
      createMessage('Something went wrong while adding new like')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    createMessage('Succesfully logged out')
  }

  return (
    <div>
      <div>{message}</div>
      {user
        ? <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          createBlog={addBlog}
          addLike={addLike}
        />
        : <Togglable buttonLabel='Login'>
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>}
    </div>
  )
}

export default App