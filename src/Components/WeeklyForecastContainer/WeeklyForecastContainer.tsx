import { Forecastday, WeatherType } from "../../types/WeatherType";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";
import "./WeeklyForecastContainer.scss";

type WeeklyForecastContainerProps = {
  classname: string;
  weatherInfo: WeatherType;
};

const WeeklyForecastContainer = ({
  classname,
  weatherInfo,
}: WeeklyForecastContainerProps) => {
  const forecastInfo: Forecastday[] = weatherInfo.forecast.forecastday;
  return (
    <>
      {weatherInfo &&
        forecastInfo.map((forecast, index) => (
          <section className={classname}>
            <WeeklyForecast
              key={index}
              classname={classname}
              day={forecast.date}
              minTemp={forecast.day.mintemp_c}
              maxTemp={forecast.day.maxtemp_c}
              condition={forecast.day.condition.text}
              conditionImage={forecast.day.condition.icon}
            />
          </section>
        ))}
    </>
  );
};

export default WeeklyForecastContainer;
