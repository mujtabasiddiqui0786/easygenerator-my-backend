// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: any) {
    const { email, name, password } = body;
    return this.userService.signUp(email, name, password);
  }

  @Post('signin')
  async signIn(@Body() body: any) {
    const { email, password } = body;
    return this.userService.signIn(email, password);
  }
}
