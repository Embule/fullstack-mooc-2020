const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users).status(201)
  } catch (e) {
    throw e
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (e) {
    throw e
  }
})

module.exports = usersRouter