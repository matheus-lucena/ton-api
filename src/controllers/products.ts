import { Request, Response } from 'express';
import ProductServiceImpl from '../services/impl/product';
import { HttpResult } from '../utils/http';
import { GENERIC_SUCCESS } from '../config/messages';
import { ProducSn } from '../types/request/products';
import { Product, ProductUpdate } from '../types/model/product';

export async function list(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  return res.json(new HttpResult(GENERIC_SUCCESS, productService.listProduct()));
}

export async function getInfo(req: Request<ProducSn>, res: Response) {
  const productService = new ProductServiceImpl();
  res.json(new HttpResult(GENERIC_SUCCESS, productService.getProduct(req.params.sn)));
}

export async function register(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  const product: Product = {
    name: 'teste',
    sn: 'teste',
    image_url: 'teste',
    value: 50,
  };
  res.json(new HttpResult(GENERIC_SUCCESS, productService.createProduct(product)));
}

export async function update(req: Request<ProducSn>, res: Response) {
  const productService = new ProductServiceImpl();
  const product: ProductUpdate = {
    name: 'teste',
    image_url: 'teste',
    value: 50,
  };
  res.json(new HttpResult(GENERIC_SUCCESS, productService.updateProduct(req.params.sn, product)));
}
