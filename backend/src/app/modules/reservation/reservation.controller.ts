import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import UserContactRepository from 'src/infra/database/repositories/ADMUserContactRepository';
import { ReservationService } from './reservation.service';
import {
  AcceptReservationDTO,
  MakeReservationDTO,
  ReservationCreationDTO,
} from 'src/infra/database/interfaces/reservation.interface';
import { ReservationRepository } from 'src/infra/database/repositories/ReservationRepository';
import { ReservationConnectionRepository } from 'src/infra/database/repositories/ReservationConnectionRepository';
import UserRepository from 'src/infra/database/repositories/UserRepository';
import FavoritesRepository from 'src/infra/database/repositories/FavoritesRepository';
import { MailService } from 'src/mail/mail.service'; 
import { EvaluationCreationDTO } from 'src/infra/database/interfaces/evalutation.interface';
import EvaluationRepository from 'src/infra/database/repositories/EvaluationRepository';

export interface FilterParams {
  city?: string;
  qtd?: number;
  date?: string;
}

export interface SetOrUnsetBodyInterface {
  reservationId: string;
  userId: string;
  setted: boolean;
}

@Controller('reservation')
export class ReservationController {
  constructor(
    private reservationRepository: ReservationRepository,
    private reservationService: ReservationService,
    private reservationConnectionRepository: ReservationConnectionRepository,
    private favoritesRepository: FavoritesRepository,
    private mailService: MailService,
    private userRepository: UserRepository,
    private evaluationRepository: EvaluationRepository,
  ) {}

  @Get()
  async getReservations() {
    const reservation = await this.reservationRepository.getReservations();
    return reservation.map(this.reservationService.getReservationResponse);
  }

  @Get('/filters')
  async getReservationsWithFilters(@Query() params: FilterParams) {
    return this.reservationRepository.getWithParams(params);
  }

  @Get('/solicitations')
  async getAllReservationSolicitation() {
    const data =
      await this.reservationRepository.getAllSolicitationsOfReservations();
    return data;
  }

  @Get(':Id')
  async getReservationById(@Param('Id') Id: string) {
    const reservation = await this.reservationRepository.getReservationById(Id);
    return this.reservationService.getReservationResponse(reservation);
  }

  @Get('cep/:cep')
  async getReservationByCEP(@Param('cep') cep: string) {
    const reservation = await this.reservationRepository.getReservationByCEP(
      cep,
    );
    return this.reservationService.getReservationResponse(reservation);
  }

  @Post()
  async createReservation(
    @Body() createReservationDTO: ReservationCreationDTO,
  ) {
    return this.reservationRepository.createReservation(createReservationDTO);
  }

  @Post('/make')
  async makeUserReservation(@Body() makeReservation: MakeReservationDTO) {
    this.reservationConnectionRepository.createReservationConnection(
      makeReservation,
    );

    //TODO colocar aqui também a chamada pro serviço de email
  }

  @Patch('/accept')
  async acceptReservation(@Body() acceptReservation: AcceptReservationDTO) {
    await this.reservationConnectionRepository.updateReservation(
      acceptReservation.id,
      acceptReservation.accepted,
    );
    const reservationId = await this.reservationConnectionRepository.getConnectionById(acceptReservation.id);
    const userGotAccepted = await this.userRepository.getUserById(reservationId.userId)

    await this.mailService.sendUserConfirmation(userGotAccepted)
  }

  @Get('/created/:id')
  async getCreatedReservations(@Param('id') id: string) {
    return this.reservationRepository.getReservationsByOwnerId(id);
  }

  @Get('/user/:id')
  async getAllUserReservation(@Param('id') id: string) {
    const reservationConnection =
      await this.reservationConnectionRepository.getAllReservationByUserId(id);

    const reservationsIds = reservationConnection.map((e) => e.reservationId);
    const reservations = await this.reservationRepository.getReservationByList(
      reservationsIds,
    );

    return reservations.map((e, index) => {
      return {
        ...e,
        accepted: reservationConnection[index].accepted,
        connectionId: reservationConnection[index].id,
        createdAd: reservationConnection[index].createdAt,
      };
    });
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    await this.reservationRepository.deleteReservation(id);
  }

  @Patch('/favorite')
  async setOrUnsetFavorite(
    @Body() { userId, reservationId, setted }: SetOrUnsetBodyInterface,
  ) {
    const alreadyFavorite =
      await this.favoritesRepository.getByUserAndReservationId(
        userId,
        reservationId,
      );

    if ((setted && alreadyFavorite) || (!setted && !alreadyFavorite)) {
      return;
    }

    if (setted) {
      this.favoritesRepository.create(userId, reservationId);
    } else {
      this.favoritesRepository.delete(userId, reservationId);
    }
  }

  @Get('/favorites/:userId')
  async getAllFavoritesReservationByUserId(@Param('userId') id: string) {
    const reservationIds = (
      await this.favoritesRepository.getAllByUserId(id)
    ).map((e) => e.reservationId);

    const reservations = await this.reservationRepository.getReservationByList(
      reservationIds,
    );

    return reservations;
  }

  @Post('/evaluation')
  async createEvaluation(@Body() creationBody: EvaluationCreationDTO) {
    return this.evaluationRepository.create(creationBody);
  }

  @Get('/evaluation/:reservationId')
  async getEvaluationByReservationId(@Param('reservationId') id: string) {
    return this.evaluationRepository.getAllByReservationId(id);
  }

  @Get('/evaluation/:reservationId/:userId')
  async getEvaluationByReservationIdAndUserId(
    @Param('reservationId') reservationId: string,
    @Param('userId') userId: string,
  ) {
    return this.evaluationRepository.getAllByUserAndReservationId(
      userId,
      reservationId,
    );
  }

  @Get('/completed/:userId')
  async getCompletedReservationByUserId(@Param('userId') id: string) {
    const data =
      await this.reservationRepository.getCompletedEvaluationByUserId(id);
    const response = data.map((e) => ({
      ...e,
      evaluations: e.evaluations[e.evaluations.length - 1],
    }));
    return response;
  }


}
