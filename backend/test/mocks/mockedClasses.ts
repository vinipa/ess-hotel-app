import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserAuthDTO } from 'src/app/modules/auth/interfaces';
import { FilterParams } from 'src/app/modules/reservation/reservation.controller';
import { ReservationService } from 'src/app/modules/reservation/reservation.service';
import { UserService } from 'src/app/modules/user/user.service';
import { EvaluationCreationDTO } from 'src/infra/database/interfaces/evalutation.interface';
import { ReservationCreationDTO } from 'src/infra/database/interfaces/reservation.interface';
import { ReservationConnectionCreationDTO } from 'src/infra/database/interfaces/reservationConnection.interface';
import { UserCreationDTO } from 'src/infra/database/interfaces/user.interface';
import UserContactRepository from 'src/infra/database/repositories/ADMUserContactRepository';
import EvaluationRepository from 'src/infra/database/repositories/EvaluationRepository';
import FavoritesRepository from 'src/infra/database/repositories/FavoritesRepository';
import { ReservationConnectionRepository } from 'src/infra/database/repositories/ReservationConnectionRepository';
import { CompletedReservation, ReservationRepository } from 'src/infra/database/repositories/ReservationRepository';
import UserRepository from 'src/infra/database/repositories/UserRepository';
import { ADMUserContact } from 'src/infra/database/typeorm/entities/ADMUserContact.entity';
import { Evaluation } from 'src/infra/database/typeorm/entities/Evaluation.entity';
import { Favorite } from 'src/infra/database/typeorm/entities/Favorites.entity';
import { Reservation } from 'src/infra/database/typeorm/entities/Reservation.entity';
import { ReservationConnection } from 'src/infra/database/typeorm/entities/ReservationConnection.entity';
import { User } from 'src/infra/database/typeorm/entities/User.entity';
import { MailService } from 'src/mail/mail.service';
import { JWTService } from 'src/utils/auth/jwt.service';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';

export class MockAuthService extends AuthService {
  async validateLogin() {
    return {
      token: 'mockToken',
      userName: 'mockUserName',
      ADM: false,
    };
  }

  async validateTokenAndReturnId() {
    return 'mockId';
  }
}

export class MockedJWTService extends JWTService {
  getJWT() {
    return '123456';
  }

  async validateJWT() {
    return Promise.resolve('12345');
  }
}

export class MockedEncryptService extends EncryptService {
  getId() {
    return 'generateId';
  }

  getPassword() {
    return 'generatePassword' as unknown as Buffer;
  }

  validatePassword() {
    return true;
  }
}

export class MockedUserRepository extends UserRepository {
  getUserById(id: string): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id,
      name: 'Teste',
      cpf: '12345678912',
      email: 'Teste',
    });

    return Promise.resolve(user);
  }
  getUserByEmail(email: string): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name: 'Teste',
      cpf: '12345678912',
      email,
      role: 'USER',
    });

    return Promise.resolve(user);
  }
  createUser(): Promise<void> {
    return Promise.resolve();
  }
  createAdminUser(user: UserCreationDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, user);

    return Promise.resolve(newUser);
  }
  getUsers(): Promise<User[]> {
    const user = new User();

    Object.assign(user, {
      name: 'Teste',
      cpf: '12345678912',
      email: 'Teste',
    });

    return Promise.resolve([user]);
  }
  getUserByCPF(cpf: string): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name: 'Teste',
      cpf,
      email: 'Teste',
    });

    return Promise.resolve(user);
  }
}

export class MockedUserContactRepository extends UserContactRepository {
  getContactByUserId(): Promise<ADMUserContact> {
    const contact = new ADMUserContact();

    Object.assign(contact, {
      city: 'Cidade',
      complement: 'Complemento',
      neighborhood: 'Bairro',
      phone_number: '81 9 9999-9999',
      reference: 'Referencia',
      state: 'Estado',
      street: 'Rua',
      userId: 'userId',
    });

    return Promise.resolve(contact);
  }

  createContact(): Promise<ADMUserContact> {
    const newContact = new ADMUserContact();

    Object.assign(newContact, {
      city: 'Cidade',
      complement: 'Complemento',
      neighborhood: 'Bairro',
      phone_number: '81 9 9999-9999',
      reference: 'Referencia',
      state: 'Estado',
      street: 'Rua',
      userId: 'userId',
    });

    return Promise.resolve(newContact);
  }
}

export class MockedUserService extends UserService { }
export class MockedReservationRepository extends ReservationRepository {
  getReservations(): Promise<Reservation[]> {
    return Promise.resolve([
      {
        id: "13200fde-b393-4338-a943-16d2a6e321f6",
        name: "Praia em Barra Grande1111",
        city: "Barra Grande",
        street: "Rua Inventada",
        streetNumber: 915,
        cep: "457456443-1331",
        checkIn: "10/04/2022",
        checkOut: "30/08/2024",
        guests: 50,
        budget: 2000,
        additionalInfo: "Um lugar bem distante",
        bedrooms: 5,
        beds: 5,
        bathrooms: 8,
        photos: [],
        owner: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca"
      }
    ]);
  }
  getReservationById(id: string): Promise<Reservation> {
    return Promise.resolve(
      {
        id: "13200fde-b393-4338-a943-16d2a6e321f6",
        name: "Praia em Barra Grande1111",
        city: "Barra Grande",
        street: "Rua Inventada",
        streetNumber: 915,
        cep: "457456443-1331",
        checkIn: "10/04/2022",
        checkOut: "30/08/2024",
        guests: 50,
        budget: 2000,
        additionalInfo: "Um lugar bem distante",
        bedrooms: 5,
        beds: 5,
        bathrooms: 8,
        photos: [],
        owner: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca"
      }
    );
  }
  getReservationByCEP(cep: string): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }
  createReservation(reservation: ReservationCreationDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getReservationByList(list: string[]): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
  getReservationsByOwnerId(id: string): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
  deleteReservation(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getWithParams(filters: FilterParams): Promise<Reservation[]> {
    return Promise.resolve([
      {
        id: "13200fde-b393-4338-a943-16d2a6e321f6",
        name: "Praia em Recife",
        city: "Recife",
        street: "Rua Inventada",
        streetNumber: 915,
        cep: "457456443-1331",
        checkIn: "10/04/2022",
        checkOut: "30/08/2024",
        guests: 50,
        budget: 2000,
        additionalInfo: "Um lugar bem distante",
        bedrooms: 5,
        beds: 5,
        owner: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca",
        bathrooms: 8,
        photos: [],
      }
    ]);
  }
  getCompletedEvaluationByUserId(id: string): Promise<CompletedReservation[]> {
    throw new Error('Method not implemented.');
  }
  getAllSolicitationsOfReservations(): Promise<any[]> {
    return Promise.resolve(
      [{
        id: 8,
        userId: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca",
        reservationId: "13200fde-b393-4338-a943-16d2a6e321f6",
        accepted: "espera",
        createdAt: "2023-04-09T10:22:23.418Z",
        reservation: [
          {
            id: "13200fde-b393-4338-a943-16d2a6e321f6",
            name: "Praia em Barra Grande1111",
            city: "Barra Grande",
            street: "Rua Inventada",
            streetNumber: 915,
            cep: "457456443-1331",
            checkIn: "10/04/2022",
            checkOut: "30/08/2024",
            guests: 50,
            budget: 2000,
            additionalInfo: "Um lugar bem distante",
            bedrooms: 5,
            beds: 5,
            bathrooms: 8,
            photos: [],
            owner: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca"
          }
        ],
        user: [
          {
            id: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca",
            email: "joca_cara_legal2@gmail.com",
            cpf: "123.123.123-14",
            name: "João Marcondes",
            password: "�J\b��{��ZCЕ���MUM�t��������<cS����Hd\n�][bo���j B�bpؔ,X�",
            role: "USER"
          }
        ]
      }]
    )
  }
}

export class MockedReservationService extends ReservationService {
}

export class MockedReservationConnectionRepository extends ReservationConnectionRepository {
  getConnectionById(id: number): Promise<ReservationConnection> {
    return Promise.resolve({
      id: 8,
      userId: "1d97c5c2-bcdd-4834-bbed-c23efaba06ca",
      reservationId: "13200fde-b393-4338-a943-16d2a6e321f6",
      accepted: "espera",
    } as unknown as ReservationConnection)
  }
  getConnectionByReservationId(id: string): Promise<ReservationConnection> {
    throw new Error('Method not implemented.');
  }
  getConnectionByUserId(id: string): Promise<ReservationConnection> {
    throw new Error('Method not implemented.');
  }
  getAllReservationByUserId(id: string): Promise<ReservationConnection[]> {
    throw new Error('Method not implemented.');
  }
  createReservationConnection(reservationConnection: ReservationConnectionCreationDTO): Promise<void> {
    return Promise.resolve(null);
  }
  updateReservation(id: number, accepted: boolean): Promise<void> {
    return Promise.resolve(null)
  }

}

export class MockedFavoritesRepository extends FavoritesRepository {
  getAllByUserId(id: string): Promise<Favorite[]> {
    throw new Error('Method not implemented.');
  }
  create(userId: string, reservationId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(userId: string, reservationId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getByUserAndReservationId(userId: string, reservationId: string): Promise<Favorite> {
    throw new Error('Method not implemented.');
  }

}

export class MockedMailService extends MailService {
  sendUserConfirmation() {
    return Promise.resolve(null)
  }
}

export class MockedEvaluationRepository extends EvaluationRepository {
  getAllByReservationId(id: string): Promise<Evaluation[]> {
    throw new Error('Method not implemented.');
  }
  getAllByUserAndReservationId(userId: string, reservationId: string): Promise<Evaluation[]> {
    throw new Error('Method not implemented.');
  }
  create(creationDTO: EvaluationCreationDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

}