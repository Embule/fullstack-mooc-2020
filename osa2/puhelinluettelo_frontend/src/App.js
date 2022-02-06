import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import peopleService from './services/people'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new person')
  const [newNumber, setNewNumber] = useState('add new number')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name === newName &&
      window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`))) {
      const oldPerson = persons.find(p => p.name === newName)
      peopleService
        .update(oldPerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => (person.id === oldPerson.id) ? returnedPerson : person))
          setMessage(`${personObject.name} updated succesfully!`)
        })
        .catch(e => {
          setErrorMessage('Something went wrong while trying to update details. Hit refresh')
        })
    } else {
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${personObject.name} added succesfully!`)
        })
        .catch(error => {
          setErrorMessage(error.message)
          console.log(error.response.data)
        })
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      peopleService
        .remove(id)
        .then(() => {
          setMessage(`${name} deleted succesfully!`)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(e => {
          setErrorMessage(`${name} has already been deleted! Hit refresh`)
          setPersons(persons.filter(p => p.id !== id))
        })
      setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = e => { setNewName(e.target.value) }

  const handleNumberChange = e => { setNewNumber(e.target.value) }

  const handleFilter = e => { setNewFilter(e.target.value) }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
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
          <Person key={i} person={person} deletePerson={() => removePerson(person.id, person.name)} />
        )}
      </div>
    </div>
  )
}

export default App
