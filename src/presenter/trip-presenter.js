import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  eventsListComponent = new EventsListView();

  constructor({ tripElement, eventsElement, filtersElement, eventsModel }) {
    this.tripElement = tripElement;
    this.filtersElement = filtersElement;
    this.eventsElement = eventsElement;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.formEvent = this.eventsModel.getFormEvent();
    render(new TripInfoView(), this.tripElement, 'afterbegin');
    render(new FilterView(), this.filtersElement);
    render(new SortView(), this.eventsElement);
    render(this.eventsListComponent, this.eventsElement);
    render(new EditFormView({
      types: this.eventsModel.getTypes(),
      offers: this.eventsModel.getOffersByType(this.formEvent),
      destination: this.eventsModel.getDestinationById(this.formEvent),
      destinations: this.eventsModel.getDestinations(),
      formEvent: this.formEvent,
    }), this.eventsListComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView(
        {
          destination: this.eventsModel.getDestinationById(this.events[i]),
          offers: this.eventsModel.getOffersById(this.events[i]),
          events: this.events[i]
        }), this.eventsListComponent.getElement());
    }
  }
}
