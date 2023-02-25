const Button = ({label, action}: {label: string, action: () => void }) => {
    return <button onClick={action}>{ label }</button>
}

export default Button;