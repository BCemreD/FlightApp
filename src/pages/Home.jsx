import React, { useState, useEffect } from 'react'; // <-- Burayı güncelledik!
import { Link } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';
import CampaignSlider from '../components/CampaignSlider';



export default function Home() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    fetch(`${apiUrl}/api/flights`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        console.log('Gelen uçuşlar:', data);
      })
      .catch((err) => console.error('Uçuşlar alınamadı:', err));
  }, []);
  return (
    <div className="mx-auto px-4 py-0 sm:px-6 lg:px-8">

      <section>
        {/* Campaign images */}
        <CampaignSlider />

      </section>

      <section className="absolute top-[400px] left-1/2 transform -translate-x-1/2 w-full">
        <SearchBar />
      </section>

      <section>
        {/* Route suggestions */}
      </section>

      <section className="absolute top-[8cd00px] mx-auto px-4 py-0 sm:px-6 lg:px-8">
        {/* Dashboard */}

      </section>
    </div>
  )
}
