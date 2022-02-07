const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('most likes', () => {
  test('returns the title of blog with most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.dummyBlogs)
    expect(result).toEqual("Canonical string reduction")
  })

  test('returns text "blog list empty" if array is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual("Bloglist empty")
  })
})

describe('Author with most blogs', () => {
  const authorWithMostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }

  test('returns correct author for most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.dummyBlogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('returns null if blogs is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })
})