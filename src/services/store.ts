/* eslint-disable no-unused-vars */

import { Store } from '../types/model/store';

interface StoreService {
  listHistory(): Store[];
  buy(store: Store): Store;
}

export default StoreService;
