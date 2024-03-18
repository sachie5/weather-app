import "./WeeklyForecast.scss";

type WeeklyForecastProps = {
    classname: string;
    day: string;
    minTemp: number;
    maxTemp: number;
    condition: string;
    conditionImage: string;
}

const WeeklyForecast = ({classname, day, minTemp, maxTemp, condition, conditionImage}: WeeklyForecastProps) => {
    return (
        <div className={`${classname}__tile`}>
            <h1 className={`${classname}__tile--heading`}>{day}</h1>
            <p className={`${classname}__tile--info`}>Min. temperature: {minTemp}</p>
            <p className={`${classname}__tile--info`}>Max. temperature: {maxTemp}</p>
            <img src={conditionImage} alt={condition} />
            <p className={`${classname}__tile--info`}>{condition}</p>
        </div>
    )
}

export default WeeklyForecast;