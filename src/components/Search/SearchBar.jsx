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

    fetchLocations();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flights/search');
      const allFlights = response.data;

      const filtered = allFlights.filter(flight =>
        flight.from.toLowerCase() === fromLocation.toLowerCase() &&
        flight.to.toLowerCase() === toLocation.toLowerCase() &&
        flight.departureTime.slice(0, 10) === departureTime
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
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

            <button onClick={handleSearch} className="w-full bg-yellow-400 py-2 rounded font-bold hover:bg-yellow-300">
              Search Flight
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
