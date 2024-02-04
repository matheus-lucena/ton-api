export interface Product {
  name: string;
  sn: string;
  image_url: string;
  value: number;
}

export interface ProductUpdate {
  name: string;
  image_url: string;
  value: number;
}
