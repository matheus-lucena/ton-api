import { ShopRequest } from '../../src/types/request/shop';

export const MOCK_RESPONSE_SHOP: ShopRequest = {
  date: '1707097261967',
  client_id: 'ae304956-0230-4106-99c6-17663e943ac1',
  products: [
    {
      name: 'te asljdklaste',
      count: 2,
      sn: '192381923123d',
      value: 23,
      image_url: 'https://',
    },
    {
      name: 'te asljdklaste',
      count: 4,
      sn: '21313123123123',
      value: 50,
      image_url: 'https://',
    },
  ],
  total: 246,
  id: 'bc02c2bb-97d1-4788-888f-b57d892983aa',
};

export const MOCK_INPUT_SHOP: ShopRequest = {
  products: [
    {
      name: 'te asljdklaste',
      count: 2,
      sn: '192381923123d',
      value: 23,
      image_url: 'https://',
    },
    {
      name: 'te asljdklaste',
      count: 4,
      sn: '21313123123123',
      value: 50,
      image_url: 'https://',
    },
  ],
};
