import { useState } from 'react'

function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [stored, setStored] = useState(null)
  const [op, setOp] = useState(null)
  const [overwrite, setOverwrite] = useState(false)

  const MAX_LENGTH = 9

  const handleInput = key => {
    if (key === 'C') return clear()

    if (display === 'ERROR' && key !== 'C') {
      // Si hay ERROR y presiona cualquier número o punto, reinicia
      if ('0123456789.'.includes(key)) {
        setDisplay(key === '.' ? '0.' : key)
        setStored(null)
        setOp(null)
        setOverwrite(false)
        return
      }
      // Si es operador o igual mientras hay ERROR, no hace nada
      return
    }

    if (key === '=') return evaluate()
    if ('+-*/%'.includes(key)) return setOperator(key)
    if (key === '+/-') return toggleSign()
    if (key === '.' && display.includes('.')) return
    append(key)
  }

  const clear = () => {
    setDisplay('0')
    setStored(null)
    setOp(null)
    setOverwrite(false)
  }

  const setOperator = operator => {
    if (op && !overwrite) {
      evaluate()
    } else {
      setStored(display)
    }
    setOp(operator)
    setOverwrite(true)
  }

  const evaluate = () => {
    if (!stored || !op) return
    const a = parseFloat(stored)
    const b = parseFloat(display)
    let result

    switch (op) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '*':
        result = a * b
        break
      case '/':
        if (b === 0) return setDisplay('ERROR')
        result = a / b
        break
      case '%':
        if (b === 0) return setDisplay('ERROR')
        result = a % b
        break
      default:
        return
    }

    // Validar límite y longitud (incluyendo signo menos)
    const resultStr = result.toString()
    if (
      resultStr.length > MAX_LENGTH ||
      result > 999999999
    ) {
      setDisplay('ERROR')
    } else {
      setDisplay(resultStr)
    }

    setStored(null)
    setOp(null)
    setOverwrite(true)
  }

  const toggleSign = () => {
    if (display === '0' || display === 'ERROR') return

    const isNegative = display.startsWith('-')
    if (isNegative) {
      // Si es negativo, lo hacemos positivo quitando '-'
      setDisplay(display.slice(1))
    } else {
      // Si no es negativo, agregamos '-'
      if (display.length < MAX_LENGTH) {
        setDisplay('-' + display)
      } else {
        // Si no hay espacio para el signo menos, mostramos error
        setDisplay('ERROR')
      }
    }
  }

  const append = k => {
    if (overwrite) {
      setDisplay(k === '.' ? '0.' : k)
      setOverwrite(false)
    } else if (display.length < MAX_LENGTH) {
      setDisplay(display === '0' && k !== '.' ? k : display + k)
    }
  }

  return { display, handleInput }
}

export default useCalculator
