import { Product, ProductUpdate } from '../../types/model/product';
import ProductService from '../product';

class ProductServiceImpl implements ProductService {
  createProduct(product: Product): Product {
    return product;
  }
  getProduct(sn: string): Product {
    return {
      name: 'teste',
      sn: sn,
      image_url: 'teste',
      value: 12.42,
    };
  }
  listProduct(): Product[] {
    return [
      {
        name: 'teste',
        sn: '312321',
        image_url: 'teste',
        value: 12.42,
      },
    ];
  }
  updateProduct(sn: string, product: ProductUpdate): Product {
    return {
      ...product,
      sn: sn,
    };
  }
}

export default ProductServiceImpl;
