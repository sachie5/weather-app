import { ChangeEventHandler, MouseEventHandler } from "react";
import "./Textbox.scss";

type TextboxProps = {
  name: string;
  placeholder: string;
  entry: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleAddItem: MouseEventHandler<HTMLButtonElement>;
};

const Textbox = ({
  name,
  placeholder,
  entry,
  handleChange,
  handleAddItem,
}: TextboxProps) => {
  return (
    <div className="items">
      <input
        className="items__input"
        type="text"
        name={name}
        placeholder={placeholder}
        value={entry}
        onChange={handleChange}
      ></input>
      <button className="items__button" onClick={handleAddItem}>
        +
      </button>
    </div>
  );
};

export default Textbox;