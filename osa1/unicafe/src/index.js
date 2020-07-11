import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => (
  <h2>{header}</h2>
)

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} {props.extra}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const allClicks = props.feedback[0] + props.feedback[1] + props.feedback[2]
  const sum = props.feedback[0] - props.feedback[2]

  if (allClicks === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={props.feedback[0]} />
          <Statistic text="neutral" value={props.feedback[1]} />
          <Statistic text="bad" value={props.feedback[2]} />
          <Statistic text="all" value={allClicks} />
          <Statistic text="average" value={sum / allClicks} />
          <Statistic text="positive" value={(props.feedback[0] / allClicks) * 100} extra="%" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="Give Feedback" />
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Header header="Statistics" />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)