import React, { useEffect, useState } from 'react';
import "./index.css";
import ReservationItem from '../ReservationItem';

interface User {
  id: string;
  email: string;
  cpf: string;
  name: string;
  password: string;
  role: string;
}

interface ReservationDetails {
  id: string;
  name: string;
  city: string;
  street: string;
  streetNumber: number;
  cep: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  budget: number;
  additionalInfo: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  photos: Array<File>;
  owner: string;
}
interface ReservationProps {
  reservations: {
    id: number;
    userId: string;
    reservationId: string;
    accepted: string;
    createdAt: string;
    reservationDetails: ReservationDetails;
    user: User;
  }[];
}

const ReservationList = ({ reservations }: ReservationProps) => {
  const confirmedReservations = reservations.filter(
    (reservation) => reservation.accepted == 'aceito'
  );

  const pendingReservations = reservations.filter(
    (reservation) => reservation.accepted == 'espera'
  );
 
  if (!reservations || reservations.length === 0) {
    return <div>No reservations to display</div>;
  }

  return (
    <div className='bothLists'>
      <div className='singleLists'>
        <h1 className='textsReservas'>Reservas confirmadas</h1>
        {confirmedReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            reservation={reservation}
            renderType='adminRender'
          />
        ))}
      </div>

      <div className='singleLists'>
        <h1 className='textsReservas'>Reservas pendentes</h1>
        {pendingReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            reservation={reservation}
            renderType='adminRender'
          />
        ))}
      </div>
    </div>
  );
};


export default ReservationList;
