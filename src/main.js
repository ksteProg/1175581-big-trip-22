import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';
import EditFormModel from './model/edit-form-model.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const editFormModel = new EditFormModel();

const tripPresenter = new TripPresenter({ tripElement, eventsElement, filtersElement, eventsModel, editFormModel });

tripPresenter.init();
