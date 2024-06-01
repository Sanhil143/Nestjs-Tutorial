import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(public messageRepo:MessageRepository) {
  }

  findOne(id:string){
    return this.messageRepo.findOne(id);
  }

  findAll(){
    return this.messageRepo.findAll();
  }

  createMessage(message:string){
    return this.messageRepo.createMessage(message);
  }
}
