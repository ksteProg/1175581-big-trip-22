import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import NoEventsView from '../view/no-events-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { updateItem } from '../mocks/utils.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #tripElement = null;
  #filtersElement = null;
  #eventsElement = null;
  #eventsModel = null;
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventsView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #eventPresenters = new Map();

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

  #handleEventChange = (updatedTask) => {
    this.#events = updateItem(this.#events, updatedTask);
    this.#eventPresenters.get(updatedTask.id).init(updatedTask);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(this.#sortComponent, this.#eventsElement, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#tripElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    render(this.#filterComponent, this.#filtersElement, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvent() {
    render(this.#noEventsComponent, this.#eventsElement.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventsListComponent,
      eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    for (const event of this.#events) {
      this.#renderEvent(event);
    }
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard() {
    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderSort();

    render(this.#eventsListComponent, this.#eventsElement);

    if (this.#events.length === 0) {
      this.#renderNoEvent();
    } else {
      this.#renderEvents();
    }

  }
}
