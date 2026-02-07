import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import db from '../../config/database';
import ApiError from '../../utils/ApiError';
import { LoginDTO, AuthResponse } from '../../interfaces/auth';
import { IUser } from '../../interfaces/auth';

export class AuthService {
  async login(data: LoginDTO): Promise<AuthResponse> {
    const { email, password } = data;

    // Find user by email
    const user = await db<IUser>('hr_users')
      .where({ email })
      .first();

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getProfile(userId: number): Promise<Partial<IUser>> {
    const user = await db<IUser>('hr_users')
      .select('id', 'email', 'name', 'created_at')
      .where({ id: userId })
      .first();

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  }
}

export default new AuthService();