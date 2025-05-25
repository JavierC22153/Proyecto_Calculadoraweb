import Button from './Button'

const buttons = [
'C', '', '%', '/',
'7', '8', '9', '*',
'4', '5', '6', '-',
'3', '2', '1', '+',
'+/-','0', '.', '='
]

function Keypad({ onButtonClick }) {
return (
<div className="keypad">
{buttons.map(b => (
<Button key={b} label={b} onClick={() => onButtonClick(b)} />
))}
</div>
)
}
export default Keypad