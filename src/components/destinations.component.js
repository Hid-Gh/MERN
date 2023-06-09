import React, { useState, useEffect } from 'react';
import './destinations.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Destinations = () => {
  const [searchText, setSearchText] = useState('');
  const [continent, setContinent] = useState('');
  const [destinations, setDestinations] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://azuretravel.onrender.com/api/v1/destination');
        const { data } = response.data;
        setDestinations(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const filteredDestinations = destinations && destinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (continent === '' || destination.continent === continent)
    );
  });

  const continents = [
    'All',
    'Asia',
    'Africa',
    'Europe',
    'North America',
    'Oceania',
    'South America'
  ];

  return (
    <div className="body">
      <h1>Destinations</h1>
      <div className="search">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search destinations"
        />
        <select value={continent} onChange={handleContinentChange}>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
       
  <div className="destinations">
  {filteredDestinations && filteredDestinations.map((destination) => (
    <div key={destination._id} className="destination">
      <img src={destination.image} alt={destination.name} />
      <div className="destination-info">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <p>Continent: {destination.continent}</p>
        <p>Climate: {destination.climate}</p>
        <p>Best Time to Visit: {destination.bestTimeToVisit}</p>
        <p>Language: {destination.language}</p>
        <p>Currency: {destination.currency}</p>
        <div className="button-container">
          <Link to={{ pathname: `/api/v1/destination/${destination._id}/user/null`, state: { id: destination._id } }} className="button">Book</Link>
        </div>
      </div> 
    </div>
  ))}
</div>
    </div>
  );
};

export default Destinations;