import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => (
  <h2>{header}</h2>
)

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Statistics = (props) => {
  if (props.value === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <p>{props.text}: {props.value} {props.extra}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const allClicks = good + neutral + bad

  const handleGood = () => {
    console.log('clicked good');
    setGood(good + 1)
    setSum(sum + 1)
  }
  const handleNeutral = () => {
    console.log('clicked neutral');
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    console.log('clicked bad');
    setBad(bad + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <Header header="Give Feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header header="Statistics" />
      <Statistics text="good: " value={good} />
      <Statistics text="neutral: " value={neutral} />
      <Statistics text="bad: " value={bad} />
      <Statistics text="all: " value={allClicks} />
      <Statistics text="average" value={sum / allClicks} />
      <Statistics text="positive: " value={(good / allClicks) * 100} extra="%" />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)