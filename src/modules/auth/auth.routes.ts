import { Router, type Router as ExpressRouter } from "express";
import authController from './auth.controller';
import { validate } from '../../middleware/validation';
import { loginSchema } from './auth.validation';
import { auth } from '../../middleware/auth';

const router: ExpressRouter = Router();


router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', auth, authController.getProfile);

export default router;