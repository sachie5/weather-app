import "./MapsTile.scss";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

type MapsTileProps = {
  latitude: number;
  longitude: number;
};

const MapsTile = ({
  latitude,
  longitude,
}: MapsTileProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });

  useEffect(() => {
    setCenter({ lat: latitude, lng: longitude });
  }, []);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const LocationPin = ({ lat, lng }: { lat: number; lng: number }) => (
    <Marker position={{ lat, lng }} />
  );

  if (loadError) return <div>Error loading maps</div>;

  return (
    isLoaded && <section className="maps">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap center={center} zoom={10} onLoad={onLoad}>
          <LocationPin lat={latitude} lng={longitude} />
        </GoogleMap>
      </LoadScript>
    </section>
  );
};

export default MapsTile;
