import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/createMessage.dto';

@Controller('message')
export class MessageController {
  @Get()
  listMesages() {}

  @Post()
  createMessage(@Body() body:CreateMessageDto) {
    console.log(body);
  }

  @Get('/:id')
  getMessage(@Param('id') id:any) {
    console.log(id);
  }
}
