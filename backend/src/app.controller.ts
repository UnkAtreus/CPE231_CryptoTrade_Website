import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postTest(@Body('x') x:string , @Body('y') y:string ): string {
    return `x = ${x} y = ${y}`;
  }
}

// GET  // www.localhost:5000/?x=10&y=11
// POST // www.localhost:5000/
