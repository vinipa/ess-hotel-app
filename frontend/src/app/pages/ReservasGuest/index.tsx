import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationListGuest from '../../components/ReservationListGuest';
import './index.css';
import { useSession } from "../../providers/SessionContext";
import { APIClient } from "../../../services/api/client";

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

const getUserId = async () => {
  const response = await axios.get(`/login/<token-usuário>`);
  return response.data.userId;
};

const ReservasGuests: React.FC = () => {
  const { session } = useSession();
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchReservations() {
      try {
        const apiClient = new APIClient();
        const id = await apiClient.getIdByToken(session.token);
        setUserId(id);
        const response = await axios.get(`http://localhost:8080/reservation/solicitations`);
        const formattedReservations = response.data.map(createReservation);
        setReservations(formattedReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    }

    fetchReservations();
  }, []);

  return (
    <div>
      <div className='contentTitle'>
      <div>
          <h1 className='texts'>Reservas como inquilino</h1>
        </div>
        <div className='divButton'>
          <button
            className='reservations_Switch_Button'
            onClick={() => window.location.href = 'http://localhost:3000/hospedagens-host'}
          >
            Ir para reservas como anfitrião
          </button>
        </div>
      </div>
      <div>
        <ReservationListGuest reservations={reservations} userId={userId} />
      </div>
    </div>
  );
};

export default ReservasGuests;
