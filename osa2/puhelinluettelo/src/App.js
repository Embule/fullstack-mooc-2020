import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('add new person')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    persons.forEach(function (name, i, arr) {
      if (persons.name ===newName) {
        alert(`${newName} + is already added to phonebook`)
      } else {
        setPersons(persons.concat(personObject))
        setNewName('')
      }
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            onChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) =>
          <Person key={i} person={person} />
        )}
      </div>
    </div>
  )

}

export default App
