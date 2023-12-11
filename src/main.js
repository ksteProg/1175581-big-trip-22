import TripPresenter from './presenter/trip-presenter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({ tripElement, eventsElement, filtersElement });

tripPresenter.init();
