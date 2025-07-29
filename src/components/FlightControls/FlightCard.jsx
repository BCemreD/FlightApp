import React from 'react';

export default function FlightCard({ reservation }) {
  if (!reservation || !reservation.flight || !reservation.passengers.length) {
    return <div className="text-gray-500">No flight data available.</div>;
  }

  const passenger = reservation.passengers[0]
  const flight = reservation.flight;

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Reservation Details</h2>

      <div className="mb-4">
        <p><strong>Passenger:</strong> {passenger.firstName} {passenger.lastName}</p>
        <p><strong>Email:</strong> {passenger.email}</p>
        <p><strong>PNR:</strong> {reservation.pnr}</p>

        <p><strong>From:</strong> {flight.from}</p>
        <p><strong>To:</strong> {flight.to}</p>
        <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
        <p><strong>Price per passenger:</strong> €{flight.price}</p>
        <p><strong>Total:</strong> €{(flight.price * reservation.passengers.length).toFixed(2)}</p>
      </div>
    </div>
  );
}
