import { Product } from '../model/product';
export interface ProducSn {
  sn: string;
}

export interface ProductRequest extends Product {}

export const ProductRequestRule = {
  name: 'required|string|min:3',
  sn: 'required|string|min:10',
  image_url: 'required|string',
  value: 'required|strict|numeric',
  active: 'required|strict|boolean',
};
