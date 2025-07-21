import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar'
import CampaignSlider from '../components/CampaignSlider';



export default function Home () {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">

      <section>
        {/* Campaign images */}
        <CampaignSlider/>
    
      </section>

      <section>
        <SearchBar/>
      </section>

      <section>
        {/* Route suggestions */}
      </section>

      <section>
        {/* Dashboard */}
      </section>
    </div>
  )
}
