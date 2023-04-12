import { Injectable } from '@nestjs/common';
import UserRepository from 'src/infra/database/repositories/UserRepository';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
import { UserAuthDTO } from './interfaces';
import { JWTService } from 'src/utils/auth/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private encryptService: EncryptService,
    private jwtService: JWTService,
  ) {}

  async validateLogin({ email, password }: UserAuthDTO) {
    const {
      password: hash,
      id,
      name,
      role,
    } = await this.userRepository.getUserByEmail(email);
    const isPasswordValid = this.encryptService.validatePassword(
      password,
      hash,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return {
      token: this.jwtService.getJWT(id),
      userName: name,
      ADM: role === 'USER' ? false : true,
    };
  }

  async validateTokenAndReturnId(token: string) {
    return this.jwtService.validateJWT(token);
  }
}
