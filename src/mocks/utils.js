import dayjs from 'dayjs';

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * (array.length - 1))];

const getRandomNumber = () => Math.floor(Math.random() * 99);

const getMultipleRandom = (arr) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.floor(Math.random() * shuffled.length));
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);


function sortByTime(eventA, eventB) {
  return getEventDuration(eventB) - getEventDuration(eventA);
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

export { getRandomArrayElement, getRandomNumber, getMultipleRandom, updateItem, sortByTime, sortByPrice};
