import Joi from 'joi';
import { LoginDTO } from '../../interfaces/auth';

export const loginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
});