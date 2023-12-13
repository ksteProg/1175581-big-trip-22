const getRandomArrayElement = (array) => array[Math.floor(Math.random() * (array.length - 1))];
const getRandomNumber = () => Math.floor(Math.random() * 99);

export {getRandomArrayElement, getRandomNumber};
