import "./ListItem.scss";

type ListItemProps = {
    item: string;
    checked: boolean;
    id: number;
    handleDelete: (id: number) => void;
    handleCheckChange: (id: number) => void;
};

const ListItem = ({item,  id, handleDelete, handleCheckChange, checked}: ListItemProps) => {

    return (
        <div className="list__item" key={id}>
            <input className="list__input" type="checkbox" name={item} value={item} onChange={() => handleCheckChange(id)} checked={checked}></input>
            <p className="list__description" id={`${id}`} >{item}</p>
            <button className="list__button" onClick={() => handleDelete(id)}>x</button>
        </div>
    )
};

export default ListItem;