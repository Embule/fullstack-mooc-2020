import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  const showCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Specify another filter.</p>
    } else if (filteredCountries.length > 1 && filteredCountries.length < 11) {
      return <ul> {filteredCountries.map((country, i) =>
        <li key={i}>{country.name}</li>)} </ul>
    } else {
      return <div>
        {filteredCountries.map((country, i) =>
          <p key={i}>
            <h3>{country.name}</h3>
            <p>
              capital: {country.capital}
              <br />
              population: {country.population}
            </p>
            <h4>Languages</h4>
            <ul>
              {country.languages.map((sub) =>
                <li>{sub.name}</li>)}
            </ul>
            <img src={country.flag} alt='Flag'
              style={{ width: "150px", height: "100px" }} />
          </p>
        )}
      </div>
    }
  }

  return (
    <div>
      <form>
        Find Countries
        <input
          type='text'
          onChange={handleFilter} />
      </form>
      <h2>Countries</h2>
      <p>{showCountries()}</p>
    </div>
  );
}

export default App;
