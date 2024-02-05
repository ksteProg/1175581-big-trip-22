import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({ tripElement, eventsElement, eventsModel, filterModel, onNewTaskDestroy: handleNewEventFormClose });

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  eventsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewTaskButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  tripPresenter.createTask();
  newEventButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();
