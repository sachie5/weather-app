import "./LocationTile.scss";

type LocationTileProps = {
    location: string,
    country: string,
    time: string,
}

const LocationTile = ({ location, country, time } : LocationTileProps) => {
    return (
        <section className="location" id="location">
          <h2 className="location__heading">Location Information</h2>
          <p className="location__information">Location: {location}</p>
          <p className="location__information">Country: {country}</p>
          <p className="location__information"> Local time: {time}</p>
        </section>
    )
}

export default LocationTile;