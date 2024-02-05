import { Request, Response } from 'express';
import ProductServiceImpl from '../services/impl/product';
import { HttpResult } from '../utils/http';
import { GENERIC_SUCCESS, PRODUCT_EXIST } from '../config/messages';
import { ProducSn } from '../types/request/products';
import { Product, ProductUpdate } from '../types/model/product';
import { STATUS_CONFLICT } from '../config/http';

export async function list(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  return res.json(new HttpResult(GENERIC_SUCCESS, await productService.listProduct()));
}

export async function getInfo(req: Request<ProducSn>, res: Response) {
  const productService = new ProductServiceImpl();
  res.json(new HttpResult(GENERIC_SUCCESS, await productService.getProduct(req.params.sn)));
}

export async function register(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  const product: Product = {
    name: 'teste',
    sn: 'teste',
    image_url: 'teste',
    value: 50,
    status: true,
  };
  const existProduct = await productService.getProduct(product.sn);
  if (existProduct) {
    res.status(STATUS_CONFLICT).json(new HttpResult(PRODUCT_EXIST, existProduct));
  } else {
    res.json(new HttpResult(GENERIC_SUCCESS, await productService.createProduct(product)));
  }
}

export async function update(req: Request<ProducSn>, res: Response) {
  const productService = new ProductServiceImpl();
  const product: ProductUpdate = {
    name: 'teste',
    image_url: 'teste',
    value: 100,
    status: true,
  };
  res.json(new HttpResult(GENERIC_SUCCESS, await productService.updateProduct(req.params.sn, product)));
}
