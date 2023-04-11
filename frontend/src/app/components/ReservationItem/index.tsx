import React, { useEffect, useState } from "react";
import { APIClient } from "../../../services/api/client";
import "./index.css";
import axios from "axios";

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
  renderType: string;
  reservation: {
    id: number;
    userId: string;
    reservationId: string;
    accepted: string;
    createdAt: string;
    reservationDetails: ReservationDetails;
    user: User;
  };
}

function ReservationItem({ reservation, renderType }: ReservationProps) {

  const handleAcceptClick = async (connectionId: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/reservation/accept/`,
        {
          id: connectionId,
          accepted: true
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = async (connectionId: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/reservation/accept/`,
        {
          id: connectionId,
          accepted: false
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div >
      {renderType === "guestRender" && ( //guest view
        <div className="reservationCardFull">
          <div>
            <img src={'https://ogimg.infoglobo.com.br/in/25167959-ae9-a68/FT1086A/MAU_1533.jpg'} alt="" className="reservationPicture" />
            <h1 className="reservationLocation">{reservation.reservationDetails.name},</h1>
            <h1 className="reservationLocation">{reservation.reservationDetails.city}</h1>
          </div>
          <div className="reservationContent">
            <div>
              <p className="reservationDates">Check-in: {reservation.reservationDetails.checkIn}</p>
              <p className="reservationDates" style={{ paddingBottom: "20px" }}>Check-out: {reservation.reservationDetails.checkOut}</p>
            </div>
            <div className="reservationActions">
              <button className="reservationAction" onClick={() => handleCancelClick(reservation.id)}>
                Cancelar
              </button>
              {reservation.user && <p>{reservation.user.cpf}</p>}
            </div>
          </div>
        </div>
      )}

      {renderType === "ownerRender" && ( //owner and admin view (can accept)
        <div className="reservationCardFull">
          <div>
            <img src={'https://ogimg.infoglobo.com.br/in/25167959-ae9-a68/FT1086A/MAU_1533.jpg'} alt="" className="reservationPicture" />
            <h1 className="reservationLocation">{reservation.reservationDetails.name},</h1>
            <h1 className="reservationLocation">{reservation.reservationDetails.city}</h1>
          </div>
          <div className="reservationContent">
            <div>
              <p className="reservationDates">Check-in: {reservation.reservationDetails.checkIn}</p>
              <p className="reservationDates" style={{ paddingBottom: "20px" }}>Check-out: {reservation.reservationDetails.checkOut}</p>
            </div>
            <div className="reservationActions">
              {!(reservation.accepted == 'aceito') && (
                <button className="reservationAction" onClick={() => handleAcceptClick(reservation.id)}>
                  Aceitar
                </button>
              )}
              <button className="reservationAction" onClick={() => handleCancelClick(reservation.id)}>
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

      {renderType === "adminRender" && ( //admin -> see IDs
        <div className="reservationCardFull">
          <div>
            <img src={'https://ogimg.infoglobo.com.br/in/25167959-ae9-a68/FT1086A/MAU_1533.jpg'} alt="" className="reservationPicture" />
            <h1 className="reservationLocation">{reservation.reservationDetails.name},</h1>
            <h1 className="reservationLocation">{reservation.reservationDetails.city}</h1>
          </div>
          <div className="reservationContent">
            <div>
              <p className="reservationDates">Check-in: {reservation.reservationDetails.checkIn}</p>
              <p className="reservationDates" style={{ paddingBottom: "20px" }}>Check-out: {reservation.reservationDetails.checkOut}</p>
            </div>
            <div className="reservationActions">
              {!(reservation.accepted == 'aceito') && (
                <button className="reservationAction" onClick={() => handleAcceptClick(reservation.id)}>
                  Aceitar
                </button>
              )}
              <button className="reservationAction" onClick={() => handleCancelClick(reservation.id)}>
                Cancelar
              </button>
            </div>
          </div>
          <div>
              <p className="reservationDates" >ID reserva:{reservation.reservationDetails.id}</p>
              <p className="reservationDates" >ID anfitrião:{reservation.reservationDetails.owner}</p>
              <p className="reservationDates" style={{ paddingBottom: "20px" }}>ID inquilino:{reservation.userId}</p>
          </div>
        </div>
      )}  
    </div>
  );
}

export default ReservationItem;