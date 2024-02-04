import express, { Request, Response } from 'express';
import { login, getInfo, register } from '../controllers/auth';
import { wrapFunction } from '../utils/wrapError';

export const router = express.Router();

router.get(
  '/',
  wrapFunction(async (req: Request, res: Response) => getInfo(req, res)),
);
router.post('/login', login);
router.post('/register', register);
