import dayjs from 'dayjs';
import { FilterType, MIN_IN_DAY, MIN_IN_HOUR, MS_IN_MIN } from './const';

function sortByTime(eventA, eventB) {
  return getEventDuration(eventB) - getEventDuration(eventA);
}

function sortByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);
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

function addTwoDigitalFormat(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

function getDurationTime(dateFrom, dateTo) {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const diff = date2.diff(date1) / MS_IN_MIN;

  if (diff < MIN_IN_HOUR) {
    return `${addTwoDigitalFormat(diff)}M`;
  }

  if (diff < MIN_IN_DAY) {
    const hours = addTwoDigitalFormat(Math.floor(diff / MIN_IN_HOUR));
    const minutes = addTwoDigitalFormat(diff % MIN_IN_HOUR);

    return `${hours}H ${minutes}M`;
  }

  {
    const days = addTwoDigitalFormat(Math.floor(diff / MIN_IN_DAY));
    const hours = addTwoDigitalFormat(Math.floor((diff % MIN_IN_DAY) / MIN_IN_HOUR));
    const minutes = addTwoDigitalFormat((diff % MIN_IN_DAY) % MIN_IN_HOUR);

    return `${days}D ${hours}H ${minutes}M`;
  }
}


export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => new Date(event.dateTo) < new Date()),
  [FilterType.PRESENT]: (events) => events.filter((event) => new Date(event.dateFrom) <= new Date() && new Date(event.dateTo) >= new Date()),
  [FilterType.FUTURE]: (events) => events.filter((event) => new Date(event.dateFrom) > new Date()),
};

export { sortByTime, sortByPrice,sortByDate, isDatesEqual, getDurationTime};
