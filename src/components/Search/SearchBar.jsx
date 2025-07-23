import React, { useState } from 'react';

export default function SearchBar() {
  // Activated section
  const [activeTab, setActiveTab] = useState('searchFlight'); // Default

  // input states for "Search Flight" 
  const [toLocation, setToLocation] = useState('');
  const [whereLocation, setWhereLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  // input states for "Manage Flights" 
  const [pnrNo, setPnrNo] = useState('');
  const [lastName, setLastName] = useState('');

  // Tab headers
  const tabClass = "px-6 py-3 text-lg font-semibold rounded-t-lg transition-colors duration-300";
  const activeTabClass = "bg-white text-gray-800 shadow-md";
  const inactiveTabClass = "bg-gray-200 text-gray-500 hover:bg-white";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-8 ">
      {/* Section nav */}
      <div className="flex ">
        <button
          onClick={() => setActiveTab('searchFlight')}
          className={`${tabClass} ${activeTab === 'searchFlight' ? activeTabClass : inactiveTabClass}`}
        >
        Search Flight
        </button>
        <button
          onClick={() => setActiveTab('manageFlights')}
          className={`${tabClass} ${activeTab === 'manageFlights' ? activeTabClass : inactiveTabClass}`}
        >
          Manage Flight
        </button>
      </div>

      {/* Sec. inputs */}
      <div className="p-8">
        {activeTab === 'searchFlight' && (
          <div className="space-y-6">
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From */}
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-800 mb-1"/>
                <input
                  type="text"
                  id="to"
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  placeholder=" From"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>

              {/* To */}
              <div>
                <label htmlFor="where" className="block text-sm font-medium text-gray-700 mb-1"/>
                <input
                  type="text"
                  id="where"
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  placeholder=" To"
                  value={whereLocation}
                  onChange={(e) => setWhereLocation(e.target.value)}
                />
              </div>

              {/* Dep. Date */}
              <div>
                <label htmlFor="departureDate" className="block text-sm font-medium text-[#010326] mb-1"/>
                <input
                  type="date"
                  id="departureDate"
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>

              {/* Person */}
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1"/>
                <input
                  type="number"
                  id="passengers"
                  min="1"
                  value={passengers}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))} // Block negatives"
                />
              </div>
            </div>
            <button className="mt-8 w-full bg-[#F2D129] text-[#010326] py-3 px-6 rounded-md font-bold text-lg
                         hover:bg-[#f2d02941] transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F2D129] focus:ring-offset-2"
            >
              Search Flight
            </button>
          </div>
        )}

        {activeTab === 'manageFlights' && (
          <div className="space-y-6">
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PNR No Input */}
              <div>
                <label htmlFor="pnrNo" className="block text-sm font-medium text-gray-700 mb-1"/>
                <input
                  type="text"
                  id="pnrNo"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  placeholder="PRN11"
                  value={pnrNo}
                  onChange={(e) => setPnrNo(e.target.value)}
                />
              </div>

              {/* Soyadı Input */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1"/>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F2D129] focus:border-[#F2D129]"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <button
              className="mt-8 w-full bg-[#F2D129] text-gray-800 py-3 px-6 rounded-md font-bold text-lg
                         hover:bg-[#f2d02941] transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F2D129] focus:ring-offset-2"
            >
              Find Flight
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
