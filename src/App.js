import axios from "axios";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { WeatherView } from "./Components/weatherView";

function App() {
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState(null);

  const fetchCity = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=OTJGwVI9jI8tUGg4snUBeq6qSOvECHaR&q=${citySearch}`
      )
      .then((res) => {
        setCityData(res.data[0]);
        setCitySearch("");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="wrapper">
      <h1 className="headline">Weather App</h1>
      <form
        className="form-group custom-form"
        autoComplete="off"
        onSubmit={fetchCity}
      >
        <label>Search for a city to get weather information</label>
        <div className="search-box">
          <input
            className="form-control"
            required
            placeholder="Enter city name..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            <Icon icon={search} size={22} />
          </button>
        </div>
      </form>
      {cityData && (
        <div style={{ padding: 10 + "px", width: 100 + "%" }}>
          <WeatherView cityData={cityData} />
        </div>
      )}
    </div>
  );
}

export default App;
