import { ChangeEvent, useEffect, useState } from "react";
import "./App.scss";
import { WeatherType } from "./types/WeatherType";
import WeatherTile from "./Components/WeatherTile/WeatherTile";
import LocationTile from "./Components/LocationTile/LocationTile";
import { Locationtype } from "./types/LocationType";
import ToDoList from "./Components/ToDoList/ToDoList";
import Nav from "./Components/Nav/Nav";
import MapsTile from "./Components/MapsTile/MapTile";
import WeeklyForecastContainer from "./Components/WeeklyForecastContainer/WeeklyForecastContainer";
import NewsTileContainer from "./Components/NewsTileContainer/NewsTileContainer";
import { News } from "./types/NewsType";

const App = () => {
  const [userLocation, setUserLocation] = useState<Locationtype>({
    latitude: 0,
    longitude: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState<WeatherType>();
  const [newsInfo, setNewsInfo] = useState<News | null>(null);
  const [greetingMessage, setGreetingMessage] = useState<string>("");
  const [entry, setEntry] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const newsKey = import.meta.env.VITE_NEWS_API_KEY;

  const getForecastWeather = async () => {
    try {
      let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userLocation.latitude},${userLocation.longitude}&days=7`;
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeatherInfo(weatherData);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.error("Network error:", error);
      } else {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const getNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsKey}`;
    const response = await fetch(url);
    const newsData = await response.json();
    setNewsInfo(newsData);
  };

  useEffect(() => {
    getForecastWeather();
  }, [userLocation]);

  useEffect(() => {
    getUserLocation();
    if (weatherInfo) {
      getTimeOfDay();
  }
  }, []);

  useEffect(() => {
    if (weatherInfo) {
      getTimeOfDay();
  }
  }, [weatherInfo]);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // have position
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
              },
              (error) => {
                // display an error
                console.error("Error getting user location:", error);
              }
            );
            getTimeOfDay();

          } else if (result.state === "denied") {
            console.log("Permission denied.");
          }
        });
    } else {
      // error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getTimeOfDay = () => {
    let time;

    weatherInfo
      ? (time = weatherInfo.location.localtime.slice(-5))
      : "No location found";

    if (time) {
      const hour = parseInt(time.split(":")[0]);

      if (hour < 12) {
        setGreetingMessage(`Good Morning. Here's this morning's weather.`);
      } else if (12 < hour && hour <= 18) {
        setGreetingMessage(`Good Afternoon. Here's this afternoon's weather.`);
      } else if (18 < hour && hour <= 21) {
        setGreetingMessage(`Good Evening. Here's this evening's weather.`);
      } else {
        setGreetingMessage(`Good Night.\nHere's tonight's weather.`);
      }
    }
  };

  const handleAddItem = () => {
    const newItem = entry;
    setItems([...items, newItem]);
    setCheckedItems([...checkedItems, false]);
    setEntry("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newItem = event.currentTarget.value;
    setEntry(newItem);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((_, index) => index !== id));
    setCheckedItems(checkedItems.filter((_, index) => index !== id));
  };

  const handleCheckChange = (id: number) => {
    const updatedCheckState = checkedItems.map((item, index) =>
      index === id ? !item : item
    );
    setCheckedItems(updatedCheckState);
  };

  return (
    <div className="app">
      <Nav />
      <h1 className="app__heading">The Little Helper</h1>
      {/*     <Button name="Get Weather Information" classname="app__button" onClick={getUserLocation}/>   */}
      <h1 className="greeting">{greetingMessage}</h1>
      <main>
        {weatherInfo && (
          <>
            <section className="weather-info">
              <LocationTile
                location={weatherInfo.location.name}
                country={weatherInfo.location.country}
                time={weatherInfo.location.localtime}
              />
              <WeatherTile
                condition={weatherInfo.current.condition.text}
                weatherImage={weatherInfo.current.condition.icon}
                temp={weatherInfo.current.temp_c}
                time={weatherInfo.location.localtime}
              />
            </section>
            <WeeklyForecastContainer
              classname={"forecast"}
              weatherInfo={weatherInfo}
            />
            <MapsTile
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            />
            <NewsTileContainer classname={"news"} news={newsInfo} />
            <ToDoList
              items={items}
              entry={entry}
              handleAddItem={handleAddItem}
              handleChange={handleChange}
              handleDelete={handleDelete}
              handleCheckChange={handleCheckChange}
              checkedItems={checkedItems}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
