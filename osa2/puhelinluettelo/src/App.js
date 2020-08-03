import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new person')
  const [newNumber, setNewNumber] = useState('add new number')
  const [newFilter, setNewFilter] = useState('')

useEffect(() => {
  axios
  .get('http://localhost:3001/persons')
  .then(res => {
    setPersons(res.data)
  })
}, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = e => {
    setNewFilter(e.target.value)
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterNames={handleFilter}
      />
      <h2>Add New Person</h2>
      <Form
        onSubmit={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person, i) =>
          <Person key={i} person={person} />
        )}
      </div>
    </div>
  )

}

export default App
