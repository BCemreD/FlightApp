import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import ManageFlight from '../FlightControls/ManageFlight';

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState('searchFlight');

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-8">
      {/* Tab Buttons */}
      <div className="flex">
        <button
          onClick={() => setActiveTab('searchFlight')}
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg shadow-md ${activeTab === 'searchFlight' ? 'bg-[#F2E205] text-[#0550f2]' : 'bg-gray-200 text-gray-500 hover:bg-white'
            }`}
        >
          Search Flight
        </button>
        <button
          onClick={() => setActiveTab('manageFlights')}
          className={`px-6 py-3 text-lg font-semibold rounded-t-lg shadow-md ${activeTab === 'manageFlights' ? 'bg-[#F2E205] text-[#0550f2]' : 'bg-gray-200 text-gray-500 hover:bg-white'
            }`}
        >
          Manage Flight
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div className="p-8">
        {activeTab === 'searchFlight' && <FlightSearch/>}
        {activeTab === 'manageFlights' && <ManageFlight />}
      </div>
    </div>
  );
}