import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../mocks/const.js';
import { isDatesEqual } from '../mocks/utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #eventsModel = null;
  #eventComponent = null;
  #editFormComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #event = null;

  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, destinations, types, offers, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.destinations = destinations;
    this.types = types;
    this.offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;
    const prevEventComponent = this.#eventComponent;
    const prevEditFormComponent = this.#editFormComponent;
    this.#eventComponent = new EventView({
      event: this.#event,
      destinations: this.destinations,
      allOffers: this.offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
    this.#editFormComponent = new EditFormView({
      types: this.types,
      allOffers: this.offers,
      destinations: this.destinations,
      event: this.#event,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this.#eventComponent, this.#eventListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEditFormComponent);

  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  #replaceEventToForm() {
    replace(this.#editFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFormSubmit = (update) => {

    const isMinorUpdate =
      !isDatesEqual(this.#event.dateFrom, update.dueDateFrom) ||
      !isDatesEqual(this.#event.dateTo, update.To);

    this.#handleDataChange(
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      UpdateType.MINOR,
      update,
    );
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ...this.#event, isFavorite: !this.#event.isFavorite },
    );
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
