import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return await this.userRepo.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  find(email:string) {
    return this.userRepo.find({where:{email:email}});
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepo.remove(user);
  }
}
