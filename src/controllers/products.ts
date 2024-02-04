import { Request, Response } from 'express';
import { getUserId } from '../utils/user';
import ProductServiceImpl from '../services/impl/product';

export async function list(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  productService.listProduct();
  return res.json('result ' + getUserId(res));
}

export async function getInfo(req: Request, res: Response) {
  return res.json('result');
}

export async function register(req: Request, res: Response) {
  return res.json('result');
}
