import Keypad from './Keypad'

export default {
  title: 'Componentes/Keypad',
  component: Keypad,
}

export const Basico = () => (
  <Keypad onButtonClick={(b) => alert(`Botón: ${b}`)} />
)