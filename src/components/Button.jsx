function Button({ label, onClick }) {
return (
<button className="button" onClick={() => onClick(label)}>
{label}
</button>
)
}

export default Button

