import { Router } from 'express';
import { authLinkedinController } from '../controllers/authLinkedin.controller';

const authRoutes = Router();

authRoutes.get('/signin/linkedin', authLinkedinController);

export default authRoutes;
