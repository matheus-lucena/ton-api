import express, { Request, Response } from 'express';
import { login, getInfo, register } from '../controllers/auth';
import { wrapFunction } from '../utils/wrapError';
import { UserRequestBody } from '../types/request/auth';
import { TypedRequestBody } from '../types/request';
import AuthMiddleware from '../middleware/auth';
import JwtServiceImpl from '../services/impl/jwt';

export const router = express.Router();

const jwtServiceImpl = new JwtServiceImpl();
const { isAuthorized } = new AuthMiddleware(jwtServiceImpl);
router.get(
  '/',
  isAuthorized,
  wrapFunction(async (req: Request, res: Response) => getInfo(req, res)),
);
router.post(
  '/login',
  wrapFunction(async (req: TypedRequestBody<UserRequestBody>, res: Response) => login(req, res)),
);
router.post(
  '/',
  wrapFunction(async (req: TypedRequestBody<UserRequestBody>, res: Response) => register(req, res)),
);
