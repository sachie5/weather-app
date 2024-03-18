import { News } from "../../types/NewsType";
import NewsTile from "../NewsTile/NewsTile";
import "./NewsTileContainer.scss";

type NewsTileContainerProps ={
    classname: string,
    news: News | null
}

const NewsTileContainer = ({classname, news}: NewsTileContainerProps) => {


    return (
        <>
         {news?.articles.map(data => <section className={classname}>
            <NewsTile classname={classname} title={data.title} author={data.author} url={data.url} />
        </section>)} 
        </>
    )
}

export default NewsTileContainer;