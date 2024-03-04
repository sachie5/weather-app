import Button from "../Button/Button";
import "./Nav.scss";

const Nav = ({}) => {
    return (
        <nav className="nav">
            <a href="#weather"><Button name={"Weather"} classname={"nav__button"} /></a>
            <a href="#todo"><Button name={"To-do"} classname={"nav__button"} /></a>
        </nav>
    )
}

export default Nav;