import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  messageService: MessageService;
  constructor() {
    //use dependency injection when you write development code
    this.messageService = new MessageService();
  }
  @Get()
  listMesages() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.createMessage(body.content)
  }

  @Get('/:id')
  getMessage(@Param('id') id: any) {
    return this.messageService.findOne(id);
  }
}
