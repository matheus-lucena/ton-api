import { Product } from '../../src/types/model/product';

export const MOCK_PRODUCT: Product = {
  name: 'teste',
  sn: 'teste',
  image_url: 'https://teste',
  active: true,
  value: 50.0,
};

export const MOCK_UPDATE_PRODUCT: Product = {
  name: 'teste',
  sn: 'teste',
  image_url: 'https://teste',
  active: true,
  value: 100.0,
};

export const LIST_MOCK_PRODUCT: Product[] = [
  MOCK_PRODUCT,
  {
    name: 'teste-2',
    sn: 'teste-2',
    image_url: 'https://teste',
    active: true,
    value: 100.0,
  },
];