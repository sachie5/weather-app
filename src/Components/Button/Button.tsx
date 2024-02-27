import { MouseEventHandler } from "react"
import "./Button.scss"

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    name: string,
    classname: string,
}

const Button = ({onClick, name, classname}: ButtonProps) => {
    return (
    <button className={classname} onClick={onClick}>{name}</button>
    )
}

export default Button;