import "./List.scss";
import ListItem from "../ListItem/ListItem";

type ListProps = {
  items: string[];
  handleListItemButtonClick:  (id: number) => void;
  handleCheckChange: (id: number) => void;
  checked: boolean[];
};

const List = ({
  items,
  handleListItemButtonClick,
  handleCheckChange,
  checked,
}: ListProps) => {
  if (!items)
    return <p>Nothing to see here yet...Add a task in the field above!</p>;

  return (
    <div className="list">
      {items.map((item, index) => (
        <ListItem
          key={item}
          item={item}
          id={index}
          checked={checked[index]}
          handleCheckChange={handleCheckChange}
          handleListItemButtonClick={handleListItemButtonClick} 
         />
      ))}
    </div>
  );
};

export default List;