import { Request, Response } from 'express';
import ProductServiceImpl from '../services/impl/product';
import { HttpResult } from '../utils/http';
import { GENERIC_INVALID_FIELDS, GENERIC_SUCCESS, PRODUCT_EXIST, PRODUCT_NOT_EXIST } from '../config/messages';
import { ProducSn, ProductRequest, ProductRequestRule } from '../types/request/products';
import { Product } from '../types/model/product';
import { STATUS_BAD_REQUEST, STATUS_CONFLICT, STATUS_NOT_FOUND } from '../config/http';
import { TypedRequestBody } from '../types/request';
import { make } from 'simple-body-validator';

export async function list(req: Request, res: Response) {
  const productService = new ProductServiceImpl();
  return res.json(new HttpResult(GENERIC_SUCCESS, await productService.listProduct()));
}

export async function getInfo(req: Request<ProducSn>, res: Response) {
  const productService = new ProductServiceImpl();
  const product = await productService.getProduct(req.params.sn);
  if (product) {
    res.json(new HttpResult(GENERIC_SUCCESS, product));
  } else {
    res.status(STATUS_NOT_FOUND).json(new HttpResult(PRODUCT_NOT_EXIST, undefined));
  }
}

export async function register(req: TypedRequestBody<ProductRequest>, res: Response) {
  const validator = make(req.body, ProductRequestRule);
  if (!validator.validate()) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(GENERIC_INVALID_FIELDS, undefined, validator.errors().all()));
  }
  const productService = new ProductServiceImpl();
  const product: Product = req.body;
  const existProduct = await productService.getProduct(product.sn);
  if (existProduct) {
    res.status(STATUS_CONFLICT).json(new HttpResult(PRODUCT_EXIST, existProduct));
  } else {
    res.json(new HttpResult(GENERIC_SUCCESS, await productService.createProduct(product)));
  }
}

export async function update(req: TypedRequestBody<ProductRequest>, res: Response) {
  const validator = make(req.body, ProductRequestRule);
  if (!validator.validate()) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(GENERIC_INVALID_FIELDS, undefined, validator.errors().all()));
  }
  const productService = new ProductServiceImpl();
  const product: Product = req.body;
  const existProduct = await productService.getProduct(req.body.sn);
  if (existProduct) {
    res.json(new HttpResult(GENERIC_SUCCESS, await productService.updateProduct(product)));
  } else {
    res.status(STATUS_NOT_FOUND).json(new HttpResult(PRODUCT_NOT_EXIST, undefined));
  }
}
