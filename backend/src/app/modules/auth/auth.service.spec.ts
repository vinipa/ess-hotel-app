import { AuthService } from './auth.service';
import {
  MockedEncryptService,
  MockedJWTService,
  MockedUserRepository,
} from 'src/../test/mocks/mockedClasses';

describe('AuthService', () => {
  let service: AuthService;

  const mockedUserRepository = new MockedUserRepository();
  const mockedEncryptService = new MockedEncryptService();
  const mockedJWTService = new MockedJWTService();

  beforeEach(async () => {
    service = new AuthService(
      mockedUserRepository,
      mockedEncryptService,
      mockedJWTService,
    );
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to validate a login', async () => {
    const password = '1234';

    const expectedData = {
      token: '123456',
      userName: 'Teste',
      ADM: false,
    };

    const response = await service.validateLogin({ email: 'Teste', password });

    expect(response).toStrictEqual(expectedData);
  });

  it('should return a error if not able to validate a login', async () => {
    const password = '12345';

    jest.spyOn(mockedEncryptService, 'validatePassword').mockReturnValue(false);

    await expect(async () => {
      await service.validateLogin({ email: 'Teste', password });
    }).rejects.toThrow();
  });
});
