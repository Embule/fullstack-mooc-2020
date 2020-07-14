import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (<h2>{props.header}</h2>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const addPoint = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  let maxPoints = Math.max(...points)
  let mostPoints = points.indexOf(maxPoints)

  return (
    <div>
      <Header header="Anecdote of the Day" />
      <p>{props.anecdotes[selected]} </p>
      <p>Has {points[selected]} votes</p>
      <Button handleClick={() => addPoint(selected)} text="vote" />
      <Button handleClick={() => setSelected(getRandomNumber(5))} text="Next anecdote" />
      <Header header="Anecdote woth most votes" />
      <p>{props.anecdotes[mostPoints]} </p>
      <p>Has {maxPoints} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)