import React, { useState } from 'react';
import axios from 'axios';
import FlightCard from './FlightCard';

export default function ManageFlight() {

    const [pnrNo, setPnrNo] = useState('');
    const [lastName, setLastName] = useState('');
    const [reservation, setReservation] = useState(null);

    const manageFlight = async () => {
        if (!pnrNo || !lastName) {
            alert('Please enter both PNR and Last Name.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/reservations/find', {
                params: { pnr: pnrNo, lastName }
            });
            if (response.data && response.data.flight) {
                setReservation(response.data); 
                console.log('Reservation found:', response.data);
            } else {
                setReservation(null);
                alert('No matching reservation found.');
            }

            // show console
        } catch (error) {
            console.error('Search error:', error);
            alert('No reservation found.');
        }

        {
            reservation === null && (
                <div className="mt-4 text-red-600 font-semibold">
                    No matching reservation found. Please check your PNR and Last Name.
                </div>
            )
        }

    };

    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1">PNR</label>
                    <input value={pnrNo} onChange={(e) => setPnrNo(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1">Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <button
                    onClick={manageFlight}
                    className="relative w-auto bg-[#F2D129] p-2 text-[#0550f2] mx-4 rounded font-bold hover:bg-[#f2d0296e]"
                >
                    Get the Flight
                </button>
            </div>
           

            {reservation && <FlightCard reservation={reservation} />}

        </div>

    );
}
