import { OFFERS } from './offers.js';
import { DESTINATIONS } from './destinations.js';
import { getRandomArrayElement } from './utils.js';

const POINTS = [
  {
    id: 0,
    basePrice: 110,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: false,
    // offers: OFFERS.map((item) => POINTS[0].type === item.type),
    type: 'taxi'
  },
  {
    id: 1,
    basePrice: 654,
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: false,
    // offers: OFFERS.map((item) => POINTS[1].type === item.type),
    type: 'bus'
  },
  {
    id: 2,
    basePrice: 878,
    dateFrom: '2019-09-10T22:55:56.845Z',
    dateTo: '2019-10-11T11:22:13.375Z',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: false,
    // offers: OFFERS.map((item) => POINTS[2].type === item.type),
    type: 'flight'
  }
];

export { POINTS };
