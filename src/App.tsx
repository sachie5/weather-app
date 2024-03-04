import { ChangeEvent, useEffect, useState } from "react";
import "./App.scss";
import { WeatherType } from "./types/WeatherType";
import WeatherTile from "./Components/WeatherTile/WeatherTile";
import LocationTile from "./Components/LocationTile/LocationTile";
import Button from "./Components/Button/Button";
import { Locationtype } from "./types/LocationType";
import List from "./Components/List/List";
import ToDoList from "./Components/ToDoList/ToDoList";
import Nav from "./Components/Nav/Nav";

const App = () => {
  const [userLocation, setUserLocation] = useState<Locationtype>({
    latitude: null,
    longitude: null
  });
  const [weatherInfo, setWeatherInfo] = useState<WeatherType>();
  const [greetingMessage, setGreetingMessage] = useState<string>("");
  const [entry, setEntry] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);


  const apiKey = "ab8c7b0bb6b94b90b87155629242702";

  const getWeather = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userLocation?.latitude},${userLocation?.longitude}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    setWeatherInfo(weatherData);
  };

  useEffect(() => {
    getWeather();
    getTimeOfDay();
    console.log(greetingMessage, userLocation);
  }, [userLocation]);


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
    } else {
      // error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getTimeOfDay = () => {
    let time;  

    weatherInfo
     ? time = weatherInfo.location.localtime.slice(-5)
     : "No location found";

    if(time){
      if(time < "12:00"){
        setGreetingMessage(`Good Morning. Here's this morning's weather.`)
      } else if ("12:00" < time && time <= "18:00"){
        setGreetingMessage(`Good Afternoon. Here's this afternoon's weather.`);
      } else if ("18:00" < time && time <= "21:00"){
        setGreetingMessage(`Good Evening. Here's this evening's weather.`);
      }else {
        setGreetingMessage(`Good Night.\nHere's tonight's weather.`);
      }
  }
}

const handleAddItem = () => {
  const newItem = entry;
  setItems([...items, newItem]);
  setCheckedItems([...checkedItems, false])
  setEntry("");
};

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const newItem = event.currentTarget.value;
  setEntry(newItem);
}

const handleDelete = (id: number) => {
  setItems(items.filter((_, index) => index !== id));
  setCheckedItems(checkedItems.filter((_, index) => index !== id));
  };

  const handleCheckChange = (id: number) => {
    const updatedCheckState = checkedItems.map((item, index) => index === id ?!item : item);
    setCheckedItems(updatedCheckState);
  }



  return (
    <div className="app">
      <Nav />
      <h1 className="app__heading">The Little Helper</h1>
      <Button name="Get Weather Information" classname="app__button" onClick={getUserLocation}/>
      <main>
        {greetingMessage && weatherInfo && (
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
        <ToDoList items={items} entry={entry} handleAddItem={handleAddItem} handleChange={handleChange} handleDelete={handleDelete} handleCheckChange={handleCheckChange} checkedItems={checkedItems} />
      </main>
    </div>
  );
};

export default App;
