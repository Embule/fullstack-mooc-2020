import React from 'react'
import Weather from './Weather'

const Info = ({ country, weather }) => {
  return (
    <div key={country.cioc}>
      <h3>{country.name.common}</h3>
      <div>
        Capital: {country.capital}
        <br />
        Population: {country.population}
      </div>
      <h4>Languages</h4>
      <ul>
        {Object.keys(country.languages).map((key) => {
          return <li key={key}>{country.languages[key]}</li>
        })}
      </ul>
      <img src={country.flags.png} alt='Flag'
        style={{ width: "150px", height: "100px" }} />
      <Weather weather={weather} />
    </div>
  )
}

export default Info;