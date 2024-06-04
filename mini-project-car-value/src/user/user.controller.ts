import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { userDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(userDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  whoAmI(@Session() session:any){
    return this.userService.findOne(session.userId)
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return "signout successfully";
  } 

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto,@Session() session:any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.userId
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto,@Session() session:any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.userId
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log(id);
    const user = await this.userService.findOne(parseInt(id));
    return user;
  }

  @Serialize(userDto)
  @Get('/')
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.remove(parseInt(id));
  }
}
