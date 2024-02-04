import express from 'express';
import { login, getInfo, register } from '../controllers/auth';

export const router = express.Router();

router.get('/', getInfo);
router.post('/login', login);
router.post('/register', register);
