const getRandomArrayElement = (array) => array[Math.floor(Math.random() * (array.length - 1))];

const getRandomNumber = () => Math.floor(Math.random() * 99);

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export { getRandomArrayElement, getRandomNumber, getMultipleRandom};
