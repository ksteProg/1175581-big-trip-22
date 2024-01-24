import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';
import {render, replace} from '../framework/render.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #tripElement = null;
  #filtersElement = null;
  #eventsElement = null;
  #eventsModel = null;

  #events = null;
  #event = null;

  constructor({ tripElement, eventsElement, filtersElement, eventsModel }) {
    this.#tripElement = tripElement;
    this.#filtersElement = filtersElement;
    this.#eventsElement = eventsElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#event = this.#eventsModel.event;

    this.#renderBoard();
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      event: event,
      destination: this.#eventsModel.getDestinationById(event),
      offers: this.#eventsModel.getOffersById(event),
      onEditClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const editFormComponent = new EditFormView({
      types: this.#eventsModel.types,
      offers: this.#eventsModel.getOffersByType(event),
      destination: this.#eventsModel.getDestinationById(event),
      destinations: this.#eventsModel.destinations,
      event: event,
      onFormSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToForm() {
      replace(editFormComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, editFormComponent);
    }

    render(eventComponent, this.#eventsListComponent.element);
  }

  #renderBoard() {

    render(new TripInfoView(), this.#tripElement, 'afterbegin');
    render(new FilterView(), this.#filtersElement);
    render(new SortView(), this.#eventsElement);
    render(this.#eventsListComponent, this.#eventsElement);

    for (const event of this.#events) {
      this.#renderEvent(event);
    }
  }
}
