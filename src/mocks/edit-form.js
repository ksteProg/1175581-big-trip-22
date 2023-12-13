import { getRandomArrayElement } from './utils';
import { CITIES, TYPES_OF_TRIP, OFFERS } from './constants.js';
import { DESTINATIONS } from './destinations.js';

const EDIT_FORM_DATA = {
  cities: CITIES,
  destination: getRandomArrayElement(DESTINATIONS),
  types: TYPES_OF_TRIP,
  offers: OFFERS
};

export { EDIT_FORM_DATA };
