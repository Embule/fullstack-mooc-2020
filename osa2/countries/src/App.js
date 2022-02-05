import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Info from './components/Info'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)
  const [cityName, setCityName] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})

  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [apiKey, cityName])

  const handleFilter = e => {
    setFilter(e.target.value)
  }

  const handleInfoClick = (country) => {
    setCountryToShow(country)
    setCityName(country.capital[0])
  }

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase()
    return countryName.includes(newFilter.toLowerCase())
  })

  const showCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Specify another filter.</p>
    }
    if (filteredCountries.length > 1 && filteredCountries.length < 11) {
      return (
        <div className="countries-container">
          {filteredCountries.map((country, i) =>
            <div key={i} className="country">{country.name.common}
              <button onClick={() => handleInfoClick(country)}>Show more info</button>
            </div>)}
          {countryToShow ? <Info country={countryToShow} weather={weatherInfo} /> : null}
        </div>)
    }
    return filteredCountries.length === 1
      ? <Info country={filteredCountries[0]} weather={weatherInfo} />
      : <div>No countries were found</div>
  }

  return (
    <div>
      <form>
        Find Countries
        <input
          type='text'
          style={{ margin: '0 0 0 10px' }}
          onChange={handleFilter} />
      </form>
      <h2>Countries</h2>
      <div>{showCountries()}</div>
    </div>
  );
}

export default App;
