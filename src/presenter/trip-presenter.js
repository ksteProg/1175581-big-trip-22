import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render } from '../framework/render.js';

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

    render(new TripInfoView(), this.#tripElement, 'afterbegin');
    render(new FilterView(), this.#filtersElement);
    render(new SortView(), this.#eventsElement);
    render(this.#eventsListComponent, this.#eventsElement);

    render(new EditFormView({
      types: this.#eventsModel.types,
      offers: this.#eventsModel.getOffersByType(this.#event),
      destination: this.#eventsModel.getDestinationById(this.#event),
      destinations: this.#eventsModel.destinations,
      event: this.#event,
    }), this.#eventsListComponent.element);

    for (const event of this.#events) {
      render(new EventView(
        {
          destination: this.#eventsModel.getDestinationById(event),
          offers: this.#eventsModel.getOffersById(event),
          event: event
        }), this.#eventsListComponent.element);
    }
  }
}
