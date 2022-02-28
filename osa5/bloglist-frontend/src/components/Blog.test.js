import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  user: 'Heidi',
  title: 'New fun blog',
  author: 'Heidi Hei',
  url: 'www.lol.net',
  likes: 45
}

test('renders title and author but not url or likes', () => {
  let container
  container = render(<Blog blog={blog} />).container

  const title = screen.getByText('New fun blog')
  expect(title).toBeDefined()

  const author = screen.getByText('Heidi Hei:')
  expect(author).toBeDefined()

  const div = container.querySelector('.detailsContainer')
  expect(div).toBeNull()
})

test('clicking Viw button show number of likes and url', async () => {

  render(
    <Blog blog={blog} />
  )

  const viewButton = screen.getByText('View')
  userEvent.click(viewButton)

  const url = screen.getByText('www.lol.net')
  const likes = screen.getByText(45)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()

})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const viewButton = screen.getByText('View')
  userEvent.click(viewButton)

  const likeButton = screen.getByText('Like')
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
