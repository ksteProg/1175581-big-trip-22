import { getRandomArrayElement } from './utils';
import { TYPES_OF_TRIP, OFFERS } from './constants.js';
import { DESTINATIONS } from './destinations.js';

const EVENTS = [
  {
    date: 'APR19',
    typeTrip: getRandomArrayElement(TYPES_OF_TRIP),
    city: getRandomArrayElement(DESTINATIONS),
    timeBegin: '10:30',
    timeEnd: '11:20',
    durationTime: '50M',
    price: '20',
    isFavorite: true,
    offers: getRandomArrayElement(OFFERS),
  },
  {
    date: 'APR20',
    typeTrip: getRandomArrayElement(TYPES_OF_TRIP),
    city: getRandomArrayElement(DESTINATIONS),
    timeBegin: '12:40',
    timeEnd: '13:20',
    durationTime: '40M',
    price: '30',
    isFavorite: false,
    offers: getRandomArrayElement(OFFERS),
  },
  {
    date: 'APR21',
    typeTrip: getRandomArrayElement(TYPES_OF_TRIP),
    city: getRandomArrayElement(DESTINATIONS),
    timeBegin: '13:30',
    timeEnd: '14:00',
    durationTime: '30M',
    price: '40',
    isFavorite: true,
    offers: getRandomArrayElement(OFFERS),
  },
  {
    date: 'APR22',
    typeTrip: getRandomArrayElement(TYPES_OF_TRIP),
    city: getRandomArrayElement(DESTINATIONS),
    timeBegin: '15:00',
    timeEnd: '15:20',
    durationTime: '20M',
    price: '50',
    isFavorite: false,
    offers: getRandomArrayElement(DESTINATIONS),
  },
  {
    date: 'APR23',
    typeTrip: getRandomArrayElement(TYPES_OF_TRIP),
    city: getRandomArrayElement(DESTINATIONS),
    timeBegin: '16:30',
    timeEnd: '16:40',
    durationTime: '10M',
    price: '60',
    isFavorite: true,
    offers: getRandomArrayElement(OFFERS),
  },
];

const getRandomEvents = () => getRandomArrayElement(EVENTS);

export { getRandomEvents};
