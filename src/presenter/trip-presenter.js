import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';


export default class TripPresenter {
  eventsListComponent = new EventsListView();
  editFormComponent = new EditFormView();

  constructor({tripElement, eventsElement, filtersElement}) {
    this.tripElement = tripElement;
    this.filtersElement = filtersElement;
    this.eventsElement = eventsElement;
  }

  init() {
    render(new TripInfoView(), this.tripElement, 'afterbegin');
    render(new FilterView(), this.filtersElement);
    render(new SortView(), this.eventsElement);
    render(this.eventsListComponent, this.eventsElement);
    render(this.editFormComponent, this.eventsListComponent.getElement());
    for (let i = 0; i < 8; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}
