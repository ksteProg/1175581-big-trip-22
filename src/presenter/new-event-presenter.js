import { remove, render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../mocks/const.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinations = null;
  #types = null;
  #offers = null;
  #editFormComponent = null;

  constructor({ eventListContainer, destinations, types, offers, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#types = types;
    this.#offers = offers;

  }

  init() {
    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EditFormView({
      types: this.#types,
      allOffers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#editFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    console.log(this);
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    console.log(this);
    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#editFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    console.log(event);
    delete event.id;
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
