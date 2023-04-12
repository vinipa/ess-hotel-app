import {
  MockedEvaluationRepository,
  MockedFavoritesRepository,
  MockedMailService,
  MockedReservationConnectionRepository,
  MockedReservationRepository,
  MockedReservationService,
  MockedUserRepository,
} from '../../../../test/mocks/mockedClasses';
import { ReservationController } from './reservation.controller';
import { MailerService } from '@nestjs-modules/mailer';

describe('ReservationController', () => {
  let controller: ReservationController;

  const mockedReservationRepository = new MockedReservationRepository();
  const mockedReservationService = new MockedReservationService();
  const mockedReservationConnectionRepository =
    new MockedReservationConnectionRepository();
  const mockedFavoritesRepository = new MockedFavoritesRepository();
  const mockedMailService = new MockedMailService(
    {} as unknown as MailerService,
  );
  const mockedUserRepository = new MockedUserRepository();
  const mockedEvaluationRepository = new MockedEvaluationRepository();

  describe('Default user routes', () => {
    beforeEach(async () => {
      controller = new ReservationController(
        mockedReservationRepository,
        mockedReservationService,
        mockedReservationConnectionRepository,
        mockedFavoritesRepository,
        mockedMailService,
        mockedUserRepository,
        mockedEvaluationRepository,
      );
    });

    afterEach(async () => {
      jest.restoreAllMocks();
    });

    it('should display all reservations', async () => {
      const expectData = [
        {
          id: 8,
          userId: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
          reservationId: '13200fde-b393-4338-a943-16d2a6e321f6',
          accepted: 'espera',
          createdAt: '2023-04-09T10:22:23.418Z',
          reservation: [
            {
              id: '13200fde-b393-4338-a943-16d2a6e321f6',
              name: 'Praia em Barra Grande1111',
              city: 'Barra Grande',
              street: 'Rua Inventada',
              streetNumber: 915,
              cep: '457456443-1331',
              checkIn: '10/04/2022',
              checkOut: '30/08/2024',
              guests: 50,
              budget: 2000,
              additionalInfo: 'Um lugar bem distante',
              bedrooms: 5,
              beds: 5,
              bathrooms: 8,
              photos: [],
              owner: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
            },
          ],
          user: [
            {
              id: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
              email: 'joca_cara_legal2@gmail.com',
              cpf: '123.123.123-14',
              name: 'João Marcondes',
              password:
                '�J\b��{��ZCЕ���MUM�t��������<cS����Hd\n�][bo���j B�bpؔ,X�',
              role: 'USER',
            },
          ],
        },
      ];

      const data = await controller.getAllReservationSolicitation();
      expect(data).toStrictEqual(expectData);
    });

    it('showed works without error', async () => {
      const expectData = {
        id: 8,
        accepted: true,
      };
      await expect(
        controller.acceptReservation(expectData),
      ).resolves.not.toThrow();
    });

    it('deve conseguir criar uma reserva sem erro', async () => {
      const expectData = {
        userId: 'a',
        reservationId: 'a',
      };
      await expect(
        controller.makeUserReservation(expectData),
      ).resolves.not.toThrow();
    });

    it('deve conseguir retornar a reserva certa utilizando getReservationById', async () => {
      const params = '13200fde-b393-4338-a943-16d2a6e321f6';
      const data = await controller.getReservationById(params);
      const expectData = {
        id: '13200fde-b393-4338-a943-16d2a6e321f6',
        name: 'Praia em Barra Grande1111',
        city: 'Barra Grande',
        street: 'Rua Inventada',
        streetNumber: 915,
        cep: '457456443-1331',
        checkIn: '10/04/2022',
        checkOut: '30/08/2024',
        guests: 50,
        budget: 2000,
        additionalInfo: 'Um lugar bem distante',
        bedrooms: 5,
        beds: 5,
        bathrooms: 8,
        photos: [],
      };

      expect(data).toStrictEqual(expectData);
    });

    it('deve conseguir retornar a reserva certa utilizando filtro de cidade', async () => {
      const params = { city: 'Recife' };
      const data = await controller.getReservationsWithFilters(params);
      const expectData = [
        {
          id: '13200fde-b393-4338-a943-16d2a6e321f6',
          name: 'Praia em Recife',
          city: 'Recife',
          street: 'Rua Inventada',
          streetNumber: 915,
          cep: '457456443-1331',
          checkIn: '10/04/2022',
          checkOut: '30/08/2024',
          guests: 50,
          budget: 2000,
          additionalInfo: 'Um lugar bem distante',
          bedrooms: 5,
          beds: 5,
          owner: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
          bathrooms: 8,
          photos: [],
        },
      ];

      expect(data).toStrictEqual(expectData);
    });

    it('deve conseguir retornar a reserva certa utilizando filtro de quantidade de pessoas', async () => {
      const params = { qtd: 50 };
      const data = await controller.getReservationsWithFilters(params);
      const expectData = [
        {
          id: '13200fde-b393-4338-a943-16d2a6e321f6',
          name: 'Praia em Recife',
          city: 'Recife',
          street: 'Rua Inventada',
          streetNumber: 915,
          cep: '457456443-1331',
          checkIn: '10/04/2022',
          checkOut: '30/08/2024',
          guests: 50,
          budget: 2000,
          additionalInfo: 'Um lugar bem distante',
          bedrooms: 5,
          beds: 5,
          owner: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
          bathrooms: 8,
          photos: [],
        },
      ];

      expect(data).toStrictEqual(expectData);
    });

    it('deve conseguir retornar a reserva certa utilizando filtro de data', async () => {
      const params = { date: '15/04/2022' };
      const data = await controller.getReservationsWithFilters(params);
      const expectData = [
        {
          id: '13200fde-b393-4338-a943-16d2a6e321f6',
          name: 'Praia em Recife',
          city: 'Recife',
          street: 'Rua Inventada',
          streetNumber: 915,
          cep: '457456443-1331',
          checkIn: '10/04/2022',
          checkOut: '30/08/2024',
          guests: 50,
          budget: 2000,
          additionalInfo: 'Um lugar bem distante',
          bedrooms: 5,
          beds: 5,
          owner: '1d97c5c2-bcdd-4834-bbed-c23efaba06ca',
          bathrooms: 8,
          photos: [],
        },
      ];

      expect(data).toStrictEqual(expectData);
    });

    it('deve conseguir listas todas as reservas', async () => {
      const expectData = [
        {
          id: '13200fde-b393-4338-a943-16d2a6e321f6',
          name: 'Praia em Barra Grande1111',
          city: 'Barra Grande',
          street: 'Rua Inventada',
          streetNumber: 915,
          cep: '457456443-1331',
          checkIn: '10/04/2022',
          checkOut: '30/08/2024',
          guests: 50,
          budget: 2000,
          additionalInfo: 'Um lugar bem distante',
          bedrooms: 5,
          beds: 5,
          bathrooms: 8,
          photos: [],
        },
      ];

      const data = await controller.getReservations();
      expect(data).toStrictEqual(expectData);
    });
  });
});
