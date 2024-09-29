// src/auth/jwt.utils.ts
import { JwtService } from '@nestjs/jwt';

export const generateToken = (jwtService: JwtService, user: any): string => {
  const payload = { email: user.email, sub: user._id }; // You can add more fields to the payload if needed.
  console.log(payload);
  return jwtService.sign(payload);
};
