import Display from './components/Display'
import Keypad from './components/Keypad'
import useCalculator from './hooks/useCalculator'
import './App.css'

function App() {
  const calc = useCalculator()

  return (
    <div className="app-container">
      <h1 className="title">Calculadora</h1>
      <div className="calculator">
        <Display value={calc.display} />
        <Keypad onButtonClick={calc.handleInput} />
      </div>
    </div>
  )
}

export default App
