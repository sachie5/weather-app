
import { useEffect, useState } from "react";
import "./App.scss";
import { WeatherType } from "./types/WeatherType";


const App = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState<WeatherType>();

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
  }, [userLocation])


  const getUserLocation = () => {
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
            // what to do once we have the position  
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude})
        },
        (error) => {
            // display an error if we cant get the users position
            console.error('Error getting user location:', error);
        }
    );
  }
  else {
      // display an error if not supported
      console.error('Geolocation is not supported by this browser.');
  }
  }

  return (
    <div className="app">
      <h1>Weather app</h1>
      <button onClick={getUserLocation}>Get User Location</button>
      {userLocation && weatherInfo && (
        <><div>
          <h2>Location Information:</h2>
          <p>Location: {weatherInfo.location.name}</p>
          <p>Country: {weatherInfo.location.country}</p>
          <p> Local time: {weatherInfo.location.localtime}</p>
        </div>
        <div>
            <h2>Weather Information:</h2>
            <p> Condition: {weatherInfo.current.condition.text}</p>
            <img src={weatherInfo.current.condition.icon} alt={weatherInfo.current.condition.text}/>
            <p> Temperature in Celsius: {weatherInfo.current.temp_c}</p>
            <p> Local time: {weatherInfo.location.localtime}</p>
          </div></>)}
    </div>
  )
}

export default App
