import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body.email, body.password);
    if (user.userId) {
      return { status: true, message: 'user signup successfully' };
    } else {
      return { status: false, message: 'error during signup' };
    }
  }

  @Get('/:id')
  async findUser(@Param('id') id:string){
    const user = await this.userService.findOne(parseInt(id));
    return user
  }

  @Get()
  findAllUser(){
    return this.userService.find();
  }

  @Patch('/:id')
  async updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
    return await this.userService.update(parseInt(id),body)
  }

  @Delete('/:id')
  async removeUser(@Param('id') id:string){
    return await this.userService.remove(parseInt(id));
  }

}
