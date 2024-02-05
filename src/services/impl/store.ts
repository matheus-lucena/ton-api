import { Store } from '../../types/model/store';
import StoreService from '../store';

class StoreServiceImpl implements StoreService {
  buy(store: Store): Store {
    return store;
  }

  listHistory(): Store[] {
    return [
      {
        products: [
          {
            name: 'teste',
            count: 2,
            image_url: 'https://',
            sn: '19238192',
            value: 23.0,
            status: true,
          },
        ],
        value: 46.0,
        date: Date.now().toString(),
      },
    ];
  }
}

export default StoreServiceImpl;
