import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationList from '../../components/ReservationListAdmin';
import './index.css';
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
  id: number;
  userId: string;
  reservationId: string;
  accepted: string;
  createdAt: string;
  reservation: ReservationDetails[];
  user: User[];
}

const ReservasAdmin: React.FC = () => {
  
  const [reservations, setReservations] = useState([]);

  const createReservation = (data: ReservationProps) => {
    const reservation = {
        id: data.id,
        userId: data.userId,
        reservationId: data.reservationId,
        accepted: data.accepted,
        createdAt: data.createdAt,
        reservationDetails: data.reservation[0],
        userDetails: data.user[0]
    };
    return reservation;
  }

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get(`http://localhost:8080/reservation/solicitations`);
        const formattedReservations = response.data.map(createReservation);
        setReservations(formattedReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }

    fetchReservations();
  }, []);


  if (!reservations || reservations.length === 0) {
    return <div>No reservations to display.</div>;
  }

  return (  
    <div>
      <ReservationList reservations={reservations} />
    </div>

  );
};

export default ReservasAdmin;
