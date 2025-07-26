import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState('searchFlight');

  // Dropdown & girişler
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allFlights, setAllFlights] = useState([]);

  const [pnrNo, setPnrNo] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/flights/locations');
        setLocations(res.data);
      } catch (err) {
        console.error('Locations not loaded:', err);
      }
    };
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/flights/search');
        setAllFlights(response.data); // Artık allFlights'ta
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
      const response = await axios.get('http://localhost:5000/flights/all');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Not reached all flights:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-8">
      <div className="flex">
        <button onClick={() => setActiveTab('searchFlight')} className="px-6 py-3 text-lg font-semibold rounded-t-lg bg-white text-gray-800 shadow-md">
          Search Flight
        </button>
        <button onClick={() => setActiveTab('manageFlights')} className="px-6 py-3 text-lg font-semibold rounded-t-lg bg-gray-200 text-gray-500 hover:bg-white">
          Manage Flight
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'searchFlight' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

              <div>
                <label className="block mb-1">Passengers</label>
                <input type="number" min="1" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value) || 1)} className="w-full p-2 border rounded" />
              </div>
            </div>

            <button onClick={handleSearch} className="w-auto bg-yellow-400 p-2 mx-4 rounded font-bold hover:bg-yellow-300">
              Search Flight
            </button>
            <button
              onClick={fetchAllFlights}
              className="relative w-auto bg-yellow-400 p-2 mx-4 rounded font-bold hover:bg-yellow-300"
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
                    <p>Total price: €{(flight.price * passengers).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No flights found for your criteria.</p>
              )}
            </div>
          </>
        )}

        {activeTab === 'manageFlights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">PNR</label>
              <input value={pnrNo} onChange={(e) => setPnrNo(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
