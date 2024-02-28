import List from "../List/List";
import Textbox from "../Textbox/Textbox";
import { ChangeEventHandler, MouseEventHandler } from "react";

type ToDoListProps = {
  entry: string;
  items: string[];
  handleListButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleListItemButtonClick: (id: number) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleCheckChange: (id: number) => void;
  checkedItems: boolean[];
};

const ToDoList = ({
  entry,
  items,
  handleListButtonClick,
  handleListItemButtonClick,
  handleChange,
  handleCheckChange,
  checkedItems,
}: ToDoListProps) => {
  return (
    <section className="todo">
      <h1 className="todo__heading">To-Do List</h1>
      <Textbox
        name="todo-list"
        placeholder="Add your task here..."
        entry={entry}
        handleListButtonClick={handleListButtonClick}
        handleChange={handleChange}
      />
      <List
        items={items}
        handleListItemButtonClick={handleListItemButtonClick}
        handleCheckChange={handleCheckChange}
        checked={checkedItems}
      />
    </section>
  );
};

export default ToDoList;
