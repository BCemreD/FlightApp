import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import BookFlight from './components/Reservation/BookFlight';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className='bg-white min-h-screen'>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/reserve/:flightId' element={<BookFlight/>}></Route>
         
        </Routes>
      </main>
    </>
  )
}

export default App

