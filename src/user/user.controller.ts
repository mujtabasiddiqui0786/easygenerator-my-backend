// src/user/user.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDocument } from './schemas/user.schema';

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

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard(@Request() req) {
    const user = req.user; // Contains userId and email
    return { message: `Welcome to your dashboard, ${user.email}!` };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDocument> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
