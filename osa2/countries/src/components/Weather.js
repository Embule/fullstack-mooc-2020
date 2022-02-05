import React from 'react'

const Weather = ({ weather }) => {
  const icon = weather.weather[0].icon
  const description = weather.weather[0].description

  return <div>
    <h4>Weather in {weather.name}</h4>
    <div>Temperature: {Math.round(weather.main.temp)} °C</div>
    <div>Wind: {weather.wind.speed} m/s</div>
    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather' title={description} />
  </div>
}

export default Weather