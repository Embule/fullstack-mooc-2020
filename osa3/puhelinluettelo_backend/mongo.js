const mongoose = require('mongoose')

// takes the parameters from the command line
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.connect(url)

// defines person object schema and its model
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// person object to Person collection ==> people
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
if (process.argv.length < 4) {
  console.log('Phonebook: ');
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(response => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Too many parameters')
  process.exit(1)
}