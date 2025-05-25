import { renderHook, act } from '@testing-library/react'
import useCalculator from '../hooks/useCalculator'

test('cadena de operaciones consecutivas: 1 + 2 = + 3 = * 2 =', () => {
  const { result } = renderHook(() => useCalculator())

  const press = key => act(() => result.current.handleInput(key))

  press('1')
  press('+')
  press('2')
  press('=')

  press('+')
  press('3')
  press('=')

  press('*')
  press('2')
  press('=')

  expect(result.current.display).toBe('12')
})

test('división por cero y recuperación tras ERROR', () => {
  const { result } = renderHook(() => useCalculator())

  const press = key => act(() => result.current.handleInput(key))

  press('8')
  press('/')
  press('0')
  press('=')
  expect(result.current.display).toBe('ERROR')

  press('5')
  expect(result.current.display).toBe('5')
})

test('suma con decimales y overwrite correcto', () => {
  const { result } = renderHook(() => useCalculator())

  const press = key => act(() => result.current.handleInput(key))

  press('1')
  press('.')
  press('5')        
  press('+')
  press('2')
  press('=')
  expect(result.current.display).toBe('3.5')
})

test('operación con resultado mayor a 9 dígitos da ERROR', () => {
  const { result } = renderHook(() => useCalculator())

  const press = key => act(() => result.current.handleInput(key))

  '999999999'.split('').forEach(press)
  press('+')
  press('1')
  press('=')
  expect(result.current.display).toBe('ERROR')
})
