import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
const router = Router();

//user register route
router.post('/register', register);
//user login route
router.post('/login', login);

export default router;
