import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query"; // Import this in the files using useQuery
import { fetchCountryData } from "../../services/data";
const MapComponent: React.FC = () => {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery("countriesData", fetchCountryData);

  if (isLoading) return <p className="text-center">Loading map...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading map</p>;

  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-96">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countries.map((country: any) => (
        <Marker
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <h2 className="font-bold">{country.country}</h2>
            <p>Active Cases: {country.active.toLocaleString()}</p>
            <p>Recovered: {country.recovered.toLocaleString()}</p>
            <p>Deaths: {country.deaths.toLocaleString()}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
