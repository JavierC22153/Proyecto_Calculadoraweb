import Display from './Display'

export default {
  title: 'Componentes/Display',
  component: Display,
}

export const CeroInicial = () => <Display value="0" />
export const Resultado = () => <Display value="12345678" />
export const Error = () => <Display value="ERROR" />