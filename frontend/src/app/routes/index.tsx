import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import AdmRegisterPage from "../pages/AdmRegister";
import ReservationPage from "../pages/PublicarReserva";
import ReservasAdmin from "../pages/ReservasAdmin";
import MyReservationsPage from "../pages/MyReservations";
import ReservationHistoryPage from "../pages/ReservationHistory";
import Favorites from "../pages/Favorites";
import UserData from "../pages/UserData";
import BookingPage from '../pages/BookingPage'
import ReservasGuests from "../pages/ReservasGuest";
import ReservasHost from "../pages/ReservasHost";



export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register-adm" element={<AdmRegisterPage />} />
        <Route path="/hospedagens-admin" element={<ReservasAdmin />} />
        <Route path="/hospedagens-guests" element={<ReservasGuests />} />
        <Route path="/hospedagens-host" element={<ReservasHost />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/my-reservations" element={<MyReservationsPage />} />
        <Route
          path="/reservation-history"
          element={<ReservationHistoryPage />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user-data" element={<UserData />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
