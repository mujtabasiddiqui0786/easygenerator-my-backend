// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException('Missing token'); // Throw an error if token is missing
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      console.log('Decoded token:', decoded);
      return true;
    } catch(e) {
      console.error('JWT Validation Error:', e,  e.message);
      throw new UnauthorizedException('Invalid token');
      return false;
    }
  }
}
