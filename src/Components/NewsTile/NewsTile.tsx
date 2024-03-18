import "./NewsTile.scss";

type NewsTileProps = {
    classname: string;
    title: string,
    author: string,
    url: string
}

const NewsTile = ({classname, title, author, url}: NewsTileProps) => {
    return (
        <div className={`${classname}__tile`}>
            <h1 className={`${classname}__tile--heading`}>{title}</h1>
            <p className={`${classname}__tile--info`}> {author}</p>
            <p className={`${classname}__tile--info`}> {url}</p>
        </div>
    )
}

export default NewsTile;