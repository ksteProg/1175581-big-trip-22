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
    this.event = this.eventsModel.getEvent();

    render(new TripInfoView(), this.tripElement, 'afterbegin');
    render(new FilterView(), this.filtersElement);
    render(new SortView(), this.eventsElement);
    render(this.eventsListComponent, this.eventsElement);

    render(new EditFormView({
      types: this.eventsModel.getTypes(),
      offers: this.eventsModel.getOffersByType(this.event),
      destination: this.eventsModel.getDestinationById(this.event),
      destinations: this.eventsModel.getDestinations(),
      event: this.event,
    }), this.eventsListComponent.getElement());

    for (const event of this.events) {
      render(new EventView(
        {
          destination: this.eventsModel.getDestinationById(event),
          offers: this.eventsModel.getOffersById(event),
          event: event
        }), this.eventsListComponent.getElement());
    }
  }
}
