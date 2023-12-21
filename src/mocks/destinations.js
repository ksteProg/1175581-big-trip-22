import { getRandomNumber } from './utils';

const DESTINATIONS = [
  {
    id: 0,
    description: 'город и коммуна на востоке Франции, в департаменте Верхняя Савойя (историческая область Савойя).',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      }]
  },
  {
    id: 1,
    description: 'столица и крупнейший город Нидерландов. Является столицей королевства с 1814 года.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      }]
  },
  {
    id: 2,
    description: 'город на юго-западе Швейцарии. Столица одноимённого франкоязычного кантона и административный центр одноимённой коммуны.',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      }]
  }
];

export { DESTINATIONS };
