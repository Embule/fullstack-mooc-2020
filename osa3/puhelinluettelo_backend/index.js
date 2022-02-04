const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())

//adding middleware to show static content on webpage
app.use(express.static('build'))

// creating morgan middleware and it's tokens
const morgan = require('morgan')

morgan.token('method', function (req, res) {
  return req.method;
})

morgan.token('url', function (req, res) {
  return req.url;
})

morgan.token('status', function (req, res) {
  return res.statusCode;
})

morgan.token('res[content-length]', function (req, res) {
  return req.headers['content-length'];
})

morgan.token('response-time', function (req, res) {
  return ['response-time']
})

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
});

app.use(morgan('tiny'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res, JSON.stringify(req.body)),
  ].join(' ')
}))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// const calculatePeople = () => {
//     const number = persons.length
//     return number
// }

// const date = new Date();
// const info = "Phonebook has info for " + calculatePeople()
//     + " people </br>" + date

app.get('/info', (req, res) => {
  res.send(info)
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(person => {
    res.json(person)
  })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  // if (body.content === undefined) {
  //     return res.status(400).json({ error: 'content missing' })
  // }
  // if (!body.name || !body.number) {
  //     return res.status(400).json({
  //         error: 'Name or number missing'
  //     })
  // } else if (Person.some(p => p.name === body.name)) {
  //     return res.status(400).json({
  //         error: 'Name has already been added'
  //     })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(e => next(e))
})

// olemattomien osoitteiden käsittely
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

//virheidenkäsittelijä middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Bad id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})