import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export default function FlightCard() {


  // Dropdown & logs
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allFlights, setAllFlights] = useState([]);


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/flights/locations`);
        setLocations(res.data);
      } catch (err) {
        console.error('Locations not loaded:', err);
      }
    };
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/flights/all`);
        setAllFlights(response.data);
      } catch (error) {
        console.error('Flights not loaded:', error);
      }
    };

    fetchLocations();
    fetchFlights();
  }, []);

  const handleSearch = async () => {
    try {
      const selectedDate = new Date(departureTime);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      //this parse for prevent time zone probs.
      const endOfDay = new Date(selectedDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      endOfDay.setHours(23, 59, 0, 0);

      const filtered = allFlights.filter(flight => {
        const flightDate = new Date(flight.departureTime);
        return (
          flight.from.toLowerCase() === fromLocation.toLowerCase() &&
          flight.to.toLowerCase() === toLocation.toLowerCase() &&
          flightDate >= startOfDay && flightDate < endOfDay
        );
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const fetchAllFlights = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flights/all`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Not reached all flights:', error);
    }
  };


  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block mb-1">From</label>
          <select value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="w-full p-2 border rounded">
            <option value="">Select departure city</option>
            {locations.map((city, i) => <option key={i} value={city}>{city}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-1">To</label>
          <select value={toLocation} onChange={(e) => setToLocation(e.target.value)} className="w-full p-2 border rounded">
            <option value="">Select destination city</option>
            {locations.map((city, i) => <option key={i} value={city}>{city}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <input type="date" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      <button onClick={handleSearch} className="w-auto bg-[#F2D129] text-[#0550f2] p-2 mx-4 rounded font-bold hover:bg-[#f2d0296e]">
        Search Flight
      </button>
      <button
        onClick={fetchAllFlights}
        className="relative w-auto bg-[#F2D129] text-[#0550f2] p-2 mx-4 rounded font-bold hover:bg-[#f2d0296e]"
      >
        Avaible Flights
      </button>

      <div className="mt-6">
        {searchResults.length > 0 ? (
          searchResults.map((flight, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded shadow mb-4">
              <p>{flight.from} ➡ {flight.to}</p>
              <p>Date: {new Date(flight.departureTime).toLocaleString()}</p>
              <p>Price: €{flight.price}</p>
              <p>Total price: €{flight.price}</p>

              <Link to={`/reserve/${flight._id}`}>
                <button className="mt-2 bg-[#F2D129] text-[#0550f2] px-4 py-2 rounded hover:bg-[#f2d0296e]">
                  Book this flight
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Search for specific flights or check all available flights.</p>
        )}


      </div>


    </div>
  )
}