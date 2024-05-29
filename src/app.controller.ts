import { Controller, Get } from "@nestjs/common";


@Controller('/app')
export class AppController{
  @Get('/check')
  getCheckRoute(){
    return "check route"
  }

  @Get('/test')
  getTestRoute(){
    return "test route"
  }
}