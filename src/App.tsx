import { useEffect, useState } from "react";
import "./App.scss";
import { WeatherType } from "./types/WeatherType";
import WeatherTile from "./Components/WeatherTile/WeatherTile";
import LocationTile from "./Components/LocationTile/LocationTile";
import Button from "./Components/Button/Button";
import { Locationtype } from "./types/LocationType";

const App = () => {
  const [userLocation, setUserLocation] = useState<Locationtype>();
  const [weatherInfo, setWeatherInfo] = useState<WeatherType>();
  const [greetingMessage, setGreetingMessage] = useState<string>("");

  const apiKey = "ab8c7b0bb6b94b90b87155629242702";

  const getWeather = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userLocation.latitude},${userLocation.longitude}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    setWeatherInfo(weatherData);
    // SEND REQ IN TS
    // UPDATE greetings WITH RESPONSE
  };

  useEffect(() => {
    getWeather();
  }, [userLocation, greetingMessage]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // what to do once we have the position
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          // display an error if we cant get the users position
          console.error("Error getting user location:", error);
        }
      );
      getTimeOfDay();
    } else {
      // display an error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getTimeOfDay = () => {
    if(weatherInfo){
    const time = weatherInfo.location.localtime.slice(-5);
      if(time < "12:00"){
        setGreetingMessage("Good Morning. Here's this morning's weather.")
      } else if ("12:00" < time && time <= "18:00"){
        setGreetingMessage("Good Afternoon. Here's this afternoon's weather.");
      } else {
        setGreetingMessage("Good Night. Here's tonight's weather.");
      }
  }
  }

  console.log(weatherInfo);



  return (
    <div className="app">
      <h1 className="app__heading">Weather app</h1>
      <Button name="Get Weather Information" classname="app__button" onClick={getUserLocation}/>
      <main>
        {userLocation && weatherInfo && (
          <>
            <LocationTile
              location={weatherInfo.location.name}
              country={weatherInfo.location.country}
              time={weatherInfo.location.localtime}
            />
            <h1 className="greeting">{greetingMessage}</h1>
            <WeatherTile
              condition={weatherInfo.current.condition.text}
              weatherImage={weatherInfo.current.condition.icon}
              temp={weatherInfo.current.temp_c}
              time={weatherInfo.location.localtime}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
