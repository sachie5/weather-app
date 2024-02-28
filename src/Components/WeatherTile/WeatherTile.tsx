import "./WeatherTile.scss";

type WeatherTileProps = {
    condition: string,
    weatherImage: string,
    temp: number,
    time: string,
}

const WeatherTile = ({ condition, weatherImage, temp, time } : WeatherTileProps) => {
    return (
        <section className="weather" id="weather">
          <h2 className="weather__heading">Weather Information</h2>
          <p className="weather__information"> Condition: {condition}</p>
          <img className="weather__information--image" src={weatherImage} alt={condition} />
          <p className="weather__information"> Temperature in Celsius: {temp}</p>
          <p className="weather__information"> Local time: {time}</p>
        </section>
    )
}

export default WeatherTile;