import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new person')
  const [newNumber, setNewNumber] = useState('add new number')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = ({id, name}) => {
    peopleService
    .remove(id)
    .then(returnedPerson => {
      setPersons(persons.filter(p => p.id !==id))
      // const del = persons.filter(p => id !== p.id)
      // setPersons(del)
      // console.log('res', res);
    })
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
          <Person key={i} person={person} deletePerson={removePerson} />
        )}
      </div>
    </div>
  )

}

export default App
