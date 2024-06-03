import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }
}
