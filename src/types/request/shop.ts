export interface ProductShop {
  name: string;
  sn: string;
  image_url: string;
  value: number;
  count: number;
}

export interface ShopRequest {
  products: ProductShop[];
  total?: number;
  date?: string;
  client_id?: string;
  id?: string;
}

export const ShopRequestRule = {
  'products.*.name': 'required|string',
  'products.*.sn': 'required|string|min:10',
  'products.*.image_url': 'required|string',
  'products.*.value': 'required|strict|numeric',
  'products.*.count': 'required|strict|numeric',
};
