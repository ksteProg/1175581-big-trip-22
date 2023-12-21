import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
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
    this.points = [...this.eventsModel.getPoints()];
    render(new TripInfoView(), this.tripElement, 'afterbegin');
    render(new FilterView(), this.filtersElement);
    render(new SortView(), this.eventsElement);
    render(this.eventsListComponent, this.eventsElement);

    for (let i = 0; i < this.points.length; i++) {
      render(new EventView(this.points[i]), this.eventsListComponent.getElement());
    }
  }
}
