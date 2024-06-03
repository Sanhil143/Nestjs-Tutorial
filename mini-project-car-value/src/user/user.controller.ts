import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class UserController {
  @Post('signup')
  createUser(@Body() body:CreateUserDto){
    console.log(body);
    
  }

}
