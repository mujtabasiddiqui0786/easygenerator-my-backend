// src/user/user.service.ts
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from '../utils/jwt.util'; // Import the utility function

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

  async signUp(email: string, name: string, password: string): Promise<{ accessToken: string }> {
    if (!this.validatePassword(password)) {
      throw new BadRequestException('Password does not meet requirements.');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, name, password: hashedPassword });
    const savedUser = await user.save();

    // Generate JWT token using the utility function
    const accessToken = generateToken(this.jwtService, savedUser);

    return { accessToken };
  }

  async signIn(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

    // Generate JWT token using the utility function
    const accessToken = generateToken(this.jwtService, user);

    return { accessToken };
  }

  // Find user by ID
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
