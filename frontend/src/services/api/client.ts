import axios, { AxiosInstance } from "axios";
import { FormValues } from "./interfaces";
import {
  BookingTryValues,
  RatingResponse,
  ReservationResponse,
  UserResponse,
} from "./interfaces";
import { APIConfig } from "../../configs/api/api.config";
import { RegisterADMInterface } from "../../app/pages/AdmRegister";
import { PropsEvaluations } from "../../app/components/EvaluationField";

interface SearchParams {
  cityName?: string;
  date?: string;
  guestsNumber?: number | null;
}

export class APIClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: APIConfig.url,
    });
  }

  async sendFormRegister(data: any) {
    const response = await this.axiosClient.post("/user", data);
    console.log(response);
    return response.data;
  }

  async sendFormLogin(data: any) {
    const response = await this.axiosClient.post("/login", data);
    console.log(response);
    return response.data;
  }

  async getUsers() {
    const response = await this.axiosClient.get<UserResponse[]>("/user");
    return response.data;
  }

  async getUserById(userId: string) {
    const response = await this.axiosClient.get<UserResponse>(
      `/user/${userId}`
    );
    return response.data;
  }

  async createAdmUser(userData: RegisterADMInterface) {
    await this.axiosClient.post("/user/admin", userData);
    return true;
  }

  async createReservation(reservation: FormValues) {
    const response = await this.axiosClient.post<FormValues>(
      "/reservation",
      reservation
    );
    return response.data;
  }

  async createBookingTry(bookingTry: BookingTryValues) {
    const response = await this.axiosClient.post<BookingTryValues>(
      "/reservation/make",
      bookingTry
    );
    return response.data;
  }

  async getReservations() {
    const response = await this.axiosClient.get<ReservationResponse[]>(
      "/reservation"
    );
    return response.data;
  }

  async getReservationById(ReservationID: string) {
    const response = await this.axiosClient.get<ReservationResponse>(
      `/reservation/${ReservationID}`
    );
    return response.data;
  }

  async getReservationByCEP(ReservationCEP: string) {
    const response = await this.axiosClient.get<ReservationResponse>(
      `/reservation/cep/${ReservationCEP}`
    );
    return response.data;
  }

  async getIdByToken(token: string) {
    const response = await this.axiosClient.get<string>(`login/${token}`);
    return response.data;
  }

  async GetFavoritesReservations(id: string) {
    const response = await this.axiosClient.get<ReservationResponse[]>(
      `/reservation/favorites/${id}`
    );
    return response.data;
  }

  async getCreatedReservation(id: string) {
    const response = await this.axiosClient.get<ReservationResponse[]>(
      `/reservation/created/${id}`
    );
    return response.data;
  }

  async getReservationWithFilter(obj: SearchParams) {
    const response = await this.axiosClient.get<ReservationResponse[]>(
      `/reservation/filters?${
        obj.cityName ? `city=${encodeURI(obj.cityName)}` : ""
      }${obj.date ? `&date=${obj.date}` : ""}${
        obj.guestsNumber ? `&qtd=${obj.guestsNumber}` : ""
      }`
    );
    return response.data;
  }

  async getCompletedReservations(id: string) {
    const response = await this.axiosClient.get<ReservationResponse[]>(
      `/reservation/completed/${id}`
    );
    return response.data;
  }
  async getRatingsByReservationId(reservationId: string) {
    const response = await this.axiosClient.get<RatingResponse[]>(
      `/reservation/evaluation/${reservationId}`
    );
    return response.data;
  }

  async createEvaluation(evaluation: PropsEvaluations) {
    const response = await this.axiosClient.post<void>(
      `/reservation/evaluation`,
      evaluation
    );
  }

  async setFavoritesReservation(
    userId: string,
    reservationId: string,
    setted: boolean
  ) {
    await this.axiosClient.patch("/reservation/favorite", {
      userId,
      reservationId,
      setted,
    });
  }
}
