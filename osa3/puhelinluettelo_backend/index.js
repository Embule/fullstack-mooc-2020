const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// creating morgan middleware and it's tokens
const morgan = require('morgan')

morgan.token('method', function(req, res) {
    return req.method;
})

morgan.token('url', function(req, res) {
    return req.url;
})

morgan.token('status', function(req, res) {
    return res.statusCode;
})

morgan.token('res[content-length]', function(req, res) {
    return req.headers['content-length'];
})

morgan.token('response-time', function(req, res) {
    return ['response-time']
})

morgan.token('body', function(req, res) {
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


  
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World! </h1>')
})

const calculatePeople = () => {
    const number = persons.length
    return number
}

const date = new Date();
const info = "Phonebook has info for " + calculatePeople()
    + " people </br>" + date

app.get('/info', (req, res) => {
    // const headers = JSON.parse(JSON.stringify(res.getHeaders()))
    // console.log(headers);
    // const date = headers.get('Date')
    res.send(info)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => {
        return p.id === id
    })
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateRandomId = () => {
    const maxId = persons.length > 0
        ? Math.random(...persons.map(n => n.id))
        : 0
    return Math.floor((Math.random() * 1000) + maxId)
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    } else if (persons.some(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'Name has already been added'
        })
    }

    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number,

    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})