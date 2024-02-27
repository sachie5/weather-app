
import { useEffect, useState } from "react";
import "./App.scss";


const App = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

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


/*   const success = (pos: { coords: any; }) => {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }


  const errors = (err: { code: any; message: any; }) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
            console.log(result);
            if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            }
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}, []); */

  return (
    <div className="app">
      <h1>Weather app</h1>
      <h1>Geolocation App</h1>
      {/* create a button that is mapped to the function which retrieves the users location */}
      <button onClick={getUserLocation}>Get User Location</button>
      {/* if the user location variable has a value, print the users location */}
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
    </div>)}
    </div>
  )
}

export default App
