/* eslint-disable no-unused-vars */
import { ShopRequest } from '../types/request/shop';

interface ShopService {
  buy(shop: ShopRequest): Promise<ShopRequest | undefined>;
  listShop(): Promise<ShopRequest[]>;
  getShop(id: string): Promise<ShopRequest | undefined>;
}

export default ShopService;
