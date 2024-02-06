import dayjs from 'dayjs';
import { FilterType } from './const';

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * (array.length - 1))];

const getRandomNumber = () => Math.floor(Math.random() * 99);

const getMultipleRandom = (arr) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.floor(Math.random() * shuffled.length));
};

function sortByTime(eventA, eventB) {
  return getEventDuration(eventB) - getEventDuration(eventA);
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}


export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => new Date(event.dateTo) < new Date()),
  [FilterType.PRESENT]: (events) => events.filter((event) => new Date(event.dateFrom) <= new Date() && new Date(event.dateTo) >= new Date()),
  [FilterType.FUTURE]: (events) => events.filter((event) => new Date(event.dateFrom) > new Date()),
};

export { getRandomArrayElement, getRandomNumber, getMultipleRandom, sortByTime, sortByPrice, isDatesEqual};
