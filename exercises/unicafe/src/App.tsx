import { useState } from 'react'
import './App.css'
import Feedback from './components/Feedback'
import Header from './components/Header'
import Stat from './components/Stat'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const calcAvg = () => {
    const avg = Math.floor(((good - bad)/(good + bad + neutral)) * 100)/100
    return avg ? avg: 0
  }

  const calcPositive = () => {
    const pos = (good/total) * 100
    return pos ? pos + "%" : "0.00%"
  }

  return (
    <div className='app'>
      <Header title="give feedback"/>
      <Feedback setGood={() => incrementGood()} setNeutral={() => incrementNeutral()} setBad={() => incrementBad()} />
      <Header title="statistics"/>
      {
        total
        ? <Statistics good={good} neutral={neutral} bad={bad} all={total} average={calcAvg()} positive={calcPositive()} />
        : <p>No feedback given</p>
      }
    </div>
  )
}

export default App