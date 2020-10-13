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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
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

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})