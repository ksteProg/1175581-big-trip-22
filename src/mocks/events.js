import { OFFERS } from './offers';
import { nanoid } from 'nanoid';

const EVENTS = [
  {
    id: nanoid(),
    basePrice: 110,
    dateFrom: '2019-07-10T12:15:56.845Z',
    dateTo: '2019-08-10T13:25:56.845Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    get offers() {
      const offers = OFFERS.find((item) => item.type === this.type).offers;
      return offers.map((offer) => offer.id);
    },
    type: 'taxi',
  },
  {
    id: nanoid(),
    basePrice: 654,
    dateFrom: '2019-09-10T14:25:56.845Z',
    dateTo: '2019-10-10T15:35:56.845Z',
    destination: 'cfe416cq-11xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    get offers() {
      const offers = OFFERS.find((item) => item.type === this.type).offers;
      return offers.map((offer) => offer.id);
    },
    type: 'bus'
  },
  {
    id: nanoid(),
    basePrice: 878,
    dateFrom: '2025-10-10T16:35:56.845Z',
    dateTo: '2026-11-10T17:45:56.845Z',
    destination: 'cfe416cq-12xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    get offers() {
      const offers = OFFERS.find((item) => item.type === this.type).offers;
      return offers.map((offer) => offer.id);
    },
    type: 'flight'
  }
];

export { EVENTS };
