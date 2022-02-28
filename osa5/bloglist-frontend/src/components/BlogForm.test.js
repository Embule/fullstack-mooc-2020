import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const newBlog = {
  author: "Joseph",
  title: "New Year, New Me",
  url: "www.poc.com"
}

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const sendButton = screen.getByText('Create new')


  userEvent.type(titleInput, newBlog.title)
  userEvent.type(authorInput, newBlog.author)
  userEvent.type(urlInput, newBlog.url)
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(newBlog)
})