import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import NoEventsView from '../view/no-events-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem, sortByTime, sortByPrice } from '../mocks/utils.js';
import { SortType } from '../mocks/const.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #tripElement = null;
  #filtersElement = null;
  #eventsElement = null;
  #eventsModel = null;
  #sortComponent = null;
  #noEventsComponent = new NoEventsView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #eventPresenters = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedEvents = [];

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

    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderBoard();
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

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
