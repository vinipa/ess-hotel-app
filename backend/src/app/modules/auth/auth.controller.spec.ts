import {
  MockAuthService,
  MockedEncryptService,
  MockedJWTService,
  MockedUserRepository,
} from '../../../../test/mocks/mockedClasses';
import { AuthController } from './auth.controller';
import { UserAuthDTO } from './interfaces';

describe('AuthController', () => {
  let controller: AuthController;

  const mockedUserRepository = new MockedUserRepository();
  const mockedEncryptService = new MockedEncryptService();
  const mockedJWTService = new MockedJWTService();
  const mockedAuthService = new MockAuthService(
    mockedUserRepository,
    mockedEncryptService,
    mockedJWTService,
  );

  beforeEach(async () => {
    controller = new AuthController(mockedAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to validate a valid login', async () => {
    const expectedData = {
      token: 'mockToken',
      userName: 'mockUserName',
      ADM: false,
    };

    const response = await controller.userLogin({} as UserAuthDTO);

    expect(response).toStrictEqual(expectedData);
  });

  it('should be able to return a valid id if receives a token', async () => {
    const expectedData = 'mockId';

    const response = await controller.getUserIdByToken('token');

    expect(response).toBe(expectedData);
  });
});
