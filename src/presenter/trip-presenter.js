import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import NoEventsView from '../view/no-events-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { sortByTime, sortByPrice, filter } from '../mocks/utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../mocks/const.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #tripElement = null;
  #eventsElement = null;
  #eventsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noEventsComponent = null;

  #tripInfoComponent = new TripInfoView();
  #eventPresenters = new Map();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTING;

  constructor({ tripElement, eventsElement, eventsModel, filterModel }) {
    this.#tripElement = tripElement;
    this.#eventsElement = eventsElement;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const events = this.#eventsModel.events;
    this.#filterType = this.#filterModel.filter;
    const filteredEvents = filter[this.#filterType](events);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  get types() {
    return this.#eventsModel.offers.map((item) => item.type);
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsElement, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({ resetSortType = false} = {}) {


    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventsComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#tripElement, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvent() {
    this.#noEventsComponent = new NoEventsView({
      filterType: this.#filterType
    });
    render(this.#noEventsComponent, this.#eventsElement, RenderPosition.AFTEREND);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventsListComponent,
      destinations: this.destinations,
      types: this.types,
      offers: this.offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    for (const event of this.events) {
      this.#renderEvent(event);
    }
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard() {
    this.#renderTripInfo();
    this.#renderSort();
    render(this.#eventsListComponent, this.#eventsElement);

    if (this.events.length === 0) {
      this.#renderNoEvent();
    } else {
      this.#renderEvents();
    }

  }
}
