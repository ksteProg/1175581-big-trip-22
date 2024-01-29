import { OFFERS } from './offers';
import { getMultipleRandom } from './utils';
import { nanoid } from 'nanoid';

const EVENTS = [
  {
    id: nanoid(),
    basePrice: 110,
    dateFrom: '19/03/19 00:00',
    dateTo: '20/03/19 00:00',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    get offers() {
      return getMultipleRandom(OFFERS.find((item) => item.type === this.type).offers);
    },
    type: 'taxi',
  },
  {
    id: nanoid(),
    basePrice: 654,
    dateFrom: '21/03/19 00:00',
    dateTo: '22/03/19 00:00',
    destination: 'cfe416cq-11xa-ye10-8077-2fs9a01edcab',
    isFavorite: true,
    get offers() {
      return getMultipleRandom(OFFERS.find((item) => item.type === this.type).offers);
    },
    type: 'bus'
  },
  {
    id: nanoid(),
    basePrice: 878,
    dateFrom: '23/03/19 00:00',
    dateTo: '24/03/19 00:00',
    destination: 'cfe416cq-12xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    get offers() {
      return getMultipleRandom(OFFERS.find((item) => item.type === this.type).offers);
    },
    type: 'flight'
  }
];

export { EVENTS };
