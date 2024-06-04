import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(email: string, password: string) {
    const userCred = await this.userService.find(email);
    if (userCred.length > 0) {
      throw new BadRequestException('email is already in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 10)) as Buffer;
    const result = salt + 'SANHIL' + hash.toString('hex');

    const newUser = await this.userService.create(email, result);
    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storeHash] = user.password.split('SANHIL');
    const hashed = (await scrypt(password, salt, 10)) as Buffer;
    if (storeHash !== hashed.toString('hex')) {
      throw new BadRequestException('incorrect password');
    }
    return user;
  }
}
