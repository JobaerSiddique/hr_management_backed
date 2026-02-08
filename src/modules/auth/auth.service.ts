import * as bcrypt from 'bcryptjs';

import db from '../../config/database';
import ApiError from '../../utils/ApiError';
import { LoginDTO, AuthResponse } from '../../interfaces/auth';
import { IUser } from '../../interfaces/auth';
import { jwtHelpers } from '@/utils/jwtHelper';

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
   const tokenData = {
      id:user.id,
      email: user.email,
   }

   const token = jwtHelpers.generateToken(tokenData, process.env.JWT_SECRET as string,process.env.JWT_EXPIRES_IN as `${number}${'s' | 'm' | 'h' | 'd'}`)

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