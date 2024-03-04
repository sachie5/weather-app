import "./List.scss";
import ListItem from "../ListItem/ListItem";

type ListProps = {
  items: string[];
  handleDelete:  (id: number) => void;
  handleCheckChange: (id: number) => void;
  checked: boolean[];
};

const List = ({
  items,
  handleDelete,
  handleCheckChange,
  checked,
}: ListProps) => {
  if (!items)
    return <p>Nothing to see here yet...Add a task in the field above!</p>;

  return (
    <div className="list">
      {items.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          id={index}
          checked={checked[index]}
          handleCheckChange={handleCheckChange}
          handleDelete={handleDelete} 
         />
      ))}
    </div>
  );
};

export default List;