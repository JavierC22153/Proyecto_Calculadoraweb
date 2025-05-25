import Button from './Button'

export default {
  title: 'Componentes/Button',
  component: Button,
}

export const Digito = () => <Button label="7" onClick={() => alert('7')} />
export const Operacion = () => <Button label="+" onClick={() => alert('+')} />