import { AuthService } from 'src/app/modules/auth/auth.service';
import { UserService } from 'src/app/modules/user/user.service';
import { UserCreationDTO } from 'src/infra/database/interfaces/user.interface';
import UserContactRepository from 'src/infra/database/repositories/ADMUserContactRepository';
import UserRepository from 'src/infra/database/repositories/UserRepository';
import { ADMUserContact } from 'src/infra/database/typeorm/entities/ADMUserContact.entity';
import { User } from 'src/infra/database/typeorm/entities/User.entity';
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

export class MockedUserService extends UserService {}
