import { Router } from 'express';
import { authorizeLinkedIn, handleLinkedInCallback } from '../controllers/authLinkedin.controller';

const authRoutes = Router();

authRoutes.post('/linkedin', authorizeLinkedIn);
authRoutes.get('/linkedin/callback', handleLinkedInCallback);

export default authRoutes;