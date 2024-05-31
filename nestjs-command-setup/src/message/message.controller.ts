import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('message')
export class MessageController {
  @Get()
  listMesages() {}

  @Post()
  createMessage(@Body() body:any) {
    console.log(body);
  }

  @Get('/:id')
  getMessage(@Param('id') id:any) {
    console.log(id);
  }
}
