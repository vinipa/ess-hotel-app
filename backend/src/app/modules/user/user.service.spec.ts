import { UserService } from './user.service';
import { Role, User } from 'src/infra/database/typeorm/entities/User.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
  });

  describe('getUserResponse', () => {
    it('should return a formatted user response object', () => {
      const user = {
        id: '123-123',
        email: 'john.doe@example.com',
        name: 'John Doe',
        cpf: '123.456.789-00',
        role: 'ADMIN' as Role,
      } as unknown as User;

      const expectedResponse = {
        id: '123-123',
        email: 'john.doe@example.com',
        name: 'John Doe',
        cpf: '***.***.***-00',
        role: 'ADMIN' as Role,
      };

      expect(service.getUserResponse(user)).toEqual(expectedResponse);
    });
  });
});
