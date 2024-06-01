import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(public messageService:MessageService) {
  }
  @Get()
  listMesages() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.createMessage(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: any) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
