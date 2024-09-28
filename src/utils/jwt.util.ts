import { JwtService } from '@nestjs/jwt';

// Utility function to generate a JWT token
export const generateToken = (jwtService: JwtService, user: any): string => {
  const payload = { email: user.email, sub: user._id }; // Adjust the payload as needed
  return jwtService.sign(payload);
};
