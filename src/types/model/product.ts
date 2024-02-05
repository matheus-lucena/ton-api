export interface Product {
  name: string;
  sn: string;
  image_url: string;
  value: number;
  status: boolean;
}

export interface ProductUpdate {
  name: string;
  image_url: string;
  value: number;
  status?: boolean;
}
