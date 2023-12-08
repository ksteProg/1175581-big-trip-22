import TripPresenter from './presenter/trip-presenter.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const tripElement = headerElement.querySelector('.trip-main');
const mainElement = document.querySelector('.page-main');
const eventsElement = mainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter({ tripElement, eventsElement, filtersElement });

tripPresenter.init();
