import { OFFERS, TYPES_OF_TRIP } from './constants';
import { getRandomNumber, getRandomArrayElement } from './utils';

const DESTINATIONS = [
  {
    name: 'Amsterdam',
    description: ' столица и крупнейший город Нидерландов. Является столицей королевства с 1814 года.',
    photos: [`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`],
    offers: OFFERS,
    type: getRandomArrayElement(TYPES_OF_TRIP),
  },
  {
    name: 'Chamonix',
    description: 'город и коммуна на востоке Франции, в департаменте Верхняя Савойя (историческая область Савойя).',
    photos: [`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`],
    offers: OFFERS,
    type: getRandomArrayElement(TYPES_OF_TRIP),
  },
  {
    name: 'Geneva',
    description: 'город на юго-западе Швейцарии. Столица одноимённого франкоязычного кантона и административный центр одноимённой коммуны.',
    photos: [`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`],
    offers: OFFERS,
    type: getRandomArrayElement(TYPES_OF_TRIP),
  }
];

export { DESTINATIONS };
