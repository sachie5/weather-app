import { Forecastday, WeatherType } from "../../types/WeatherType";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";
import "./WeeklyForecastContainer.scss";

type WeeklyForecastContainerProps ={
    classname: string;
    weatherInfo: WeatherType;
}

const WeeklyForecastContainer = ({classname, weatherInfo}: WeeklyForecastContainerProps) => {

    const forecastInfo: Forecastday[] = weatherInfo.forecast.forecastday;
    return (
        <>
        {weatherInfo && (
        forecastInfo.map(forecast => {
         <section className={classname}>
            <WeeklyForecast classname={classname} day={forecast.date} minTemp={forecast.day.mintemp_c} maxTemp={forecast.day.maxtemp_c} condition={forecast.day.condition.text} conditionImage={forecast.day.condition.icon} />
{/*             <WeeklyForecast classname={classname} day={forecast.date[1]} minTemp={forecast.day.mintemp_c} maxTemp={forecast.day.maxtemp_c} condition={forecast.day.condition.text} conditionImage={forecast.day.condition.icon} />
            <WeeklyForecast classname={classname} day={forecast.date[2]} minTemp={forecast.day.mintemp_c} maxTemp={forecast.day.maxtemp_c} condition={forecast.day.condition.text} conditionImage={forecast.day.condition.icon} />
            <WeeklyForecast classname={classname} day={forecast.date[3]} minTemp={forecast.day.mintemp_c} maxTemp={forecast.day.maxtemp_c} condition={forecast.day.condition.text} conditionImage={forecast.day.condition.icon} />
            <WeeklyForecast classname={classname} day={forecast.date[4]} minTemp={forecast.day.mintemp_c} maxTemp={forecast.day.maxtemp_c} condition={forecast.day.condition.text} conditionImage={forecast.day.condition.icon} /> */}
        </section> 
            })

        )
        }
        </>
    )
}

export default WeeklyForecastContainer;