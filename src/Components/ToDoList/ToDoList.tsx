import List from "../List/List";
import Textbox from "../Textbox/Textbox";
import "./ToDoList.scss";
import { ChangeEventHandler, MouseEventHandler } from "react";

type ToDoListProps = {
  entry: string;
  items: string[];
  handleAddItem: MouseEventHandler<HTMLButtonElement>;
  handleDelete: (id: number) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleCheckChange: (id: number) => void;
  checkedItems: boolean[];
};

const ToDoList = ({
  entry,
  items,
  handleAddItem,
  handleDelete,
  handleChange,
  handleCheckChange,
  checkedItems,
}: ToDoListProps) => {
  return (
    <section className="todo" id="todo">
      <h1 className="todo__heading">To-Do List</h1>
      <Textbox
        name="todo-list"
        placeholder="Add your task here..."
        entry={entry}
        handleAddItem={handleAddItem}
        handleChange={handleChange}
      />
      <List
        items={items}
        handleDelete={handleDelete}
        handleCheckChange={handleCheckChange}
        checked={checkedItems}
      />
    </section>
  );
};

export default ToDoList;
