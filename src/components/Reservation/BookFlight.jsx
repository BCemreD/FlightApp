import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookFlight() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengerList, setPassengerList] = useState([]);

  useEffect(() => {
    const fetchFlight = async () => {
      const res = await axios.get(`http://localhost:5000/flights/${flightId}`);
      setFlight(res.data);
    };
    fetchFlight();
  }, [flightId]);

  useEffect(() => {
    const list = Array.from({ length: passengerCount }, () => ({
      firstName: '',
      lastName: '',
      email: ''
    }));
    setPassengerList(list);
  }, [passengerCount]);

  const handlePassengerChange = (index, field, value) => {
    const updatedList = [...passengerList];
    updatedList[index][field] = value;
    setPassengerList(updatedList);
  };

  const handleBook = async () => {
    try {
      const res = await axios.post('http://localhost:5000/reservations/book', {
        flightId,
        passengerList
      });
      alert(`Reservation successful. Please save your PNR: ${res.data.pnr}`);
    } catch (err) {
      alert('Reservation failed.');
      console.error(err);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 shadow-2xl/30 mt-6'>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      {flight ? (
        <>
          <h2 className="text-xl text-gray-600 font-semibold mb-4">
            Booking for: {flight.from} ➡ {flight.to}
          </h2>

          <div className="mb-4">
            <label className="block mb-1 rounded-3xl font-semibold">Passenger Count</label>
            <input
              type="number"
              min="1"
              value={passengerCount}
              onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
              className="w-full p-2 border-2 border-gray-200 rounded"
            />
          </div>

          {passengerList.map((passenger, i) => (
            <div key={i} className="mb-4 p-4 border-gray-200  rounded">
              <h3 className="font-semibold mb-2">Passenger {i + 1}</h3>
              <input
                type="text"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(i, 'firstName', e.target.value)}
                className="w-full mb-2 p-2 border-2 border-gray-200  rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(i, 'lastName', e.target.value)}
                className="w-full mb-2 p-2 border-2 border-gray-200 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(i, 'email', e.target.value)}
                className="w-full p-2 border-2 border-gray-200  rounded"
              />
            </div>
          ))}

          <button
            onClick={handleBook}
            className="bg-gradient-to-bl from-yellow-100 to-[#F2E205] text-[#0550f2] font-bold shadow-md shadow-[#0550f281]  px-4 py-2 rounded hover:opacity-70 "
          >
            Confirm Reservation
          </button>
        </>
      ) : (
        <p>Loading flight details...</p>
      )}
    </div>
    </div>
  );
}
