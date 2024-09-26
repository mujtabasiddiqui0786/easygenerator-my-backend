// src/user/user.service.ts
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService, // Inject JwtService
  ) {}
  

  private validatePassword(password: string): boolean {
    const lengthRequirement = /.{8,}/;
    const letterRequirement = /[A-Za-z]/;
    const numberRequirement = /[0-9]/;
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      lengthRequirement.test(password) &&
      letterRequirement.test(password) &&
      numberRequirement.test(password) &&
      specialCharRequirement.test(password)
    );
  }

  async signUp(email: string, name: string, password: string): Promise<UserDocument> {
    if (!this.validatePassword(password)) {
      throw new BadRequestException('Password does not meet requirements.');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, name, password: hashedPassword });
    return user.save();
  }

    // Implement signIn method
    async signIn(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
        throw new BadRequestException('Invalid credentials.');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        throw new BadRequestException('Invalid credentials.');
        }
    
        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
