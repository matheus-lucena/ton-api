import express from 'express';
import { register, getInfo, list } from '../controllers/products';

export const router = express.Router();

router.get('/', list);
router.post('/info', getInfo);
router.post('/register', register);
