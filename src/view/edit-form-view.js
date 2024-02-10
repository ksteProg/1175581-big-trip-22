import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DefaultEvent } from '../utils/const.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

function createOfferTemplate(offerByType, offers) {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${offerByType.id}" type="checkbox" name="${offerByType.title}" ${offers.some((offer) => offerByType.id === offer) ? 'checked' : ''}>
  <label class="event__offer-label" for="${offerByType.id}">
    <span class="event__offer-title">${offerByType.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerByType.price}</span>
  </label>
</div>`;
}

function createTypeItemTemplate(type) {
  const typeName = type[0].toUpperCase() + type.substring(1);
  return `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${typeName}</label>
</div>`;
}

function createEditFormTemplate(types, allOffers, destinations, state) {
  const { basePrice, dateFrom, dateTo, type, offers, isDisabled, isDeleting, isSaving } = state;

  const destination = destinations.find((dest) => state.destination === dest.id);

  const offersByType = allOffers.find((item) => item.type === state.type).offers;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${types.map((typeItem) => createTypeItemTemplate(typeItem)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${state.destination === '' ? '' : destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinations.map((dest) => `<option value="${he.encode(dest.name)}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'saving...' : 'save'}</button>
      ${state.id === '' ? '<button class="event__reset-btn" type="reset">Cancel</button>' : `<button class="event__reset-btn" type="reset">${isDeleting ? 'deleting...' : 'delete'}</button>`}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
      ${offersByType.map((offerByType) => createOfferTemplate(offerByType, offers)).join('')}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${state.destination === '' ? '' : destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${state.destination === '' ? '' : destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('')}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>
`;
}

export default class EditFormView extends AbstractStatefulView {
  #types = null;
  #allOffers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ types, allOffers, destinations, event = DefaultEvent, onFormSubmit, onDeleteClick }) {
    super();
    this.#types = types;
    this.#allOffers = allOffers;
    this.#destinations = destinations;
    this._setState(EditFormView.parseEventToState(event));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  #setDatepicker() {
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');


    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: { firstDayWeek: 1 },
        'time24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );


    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: { firstDayWeek: 1 },
        'time24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  }


  #dateFromCloseHandler = ([userDate]) => {
    this.updateElement({ dateFrom: userDate });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this.updateElement({ dateTo: userDate });
    this.#datepickerTo.set('maxDate', this._state.dateTo);
  };


  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;
    const event = { ...state };
    return event;
  }

  get template() {
    return createEditFormTemplate(this.#types, this.#allOffers, this.#destinations, this._state);
  }

  reset(event) {
    this.updateElement(
      EditFormView.parseEventToState(event)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__type-input').forEach((typeInput) => typeInput
      .addEventListener('click', this.#typeChangeHandler));
    this.#setDatepicker();
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((offerCheckbox) => offerCheckbox
      .addEventListener('click', this.#offersChangeHandler));

  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToEvent(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToEvent(this._state));
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const destinationState = this.#destinations.find((destination) => destination.name === destinationName);
    this.updateElement({
      destination: destinationState.id,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const typeValue = evt.target.value;
    this.updateElement({
      type: typeValue
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceValue = evt.target.value;
    this._setState({
      basePrice: Number(priceValue)
    });
  };

  #offersChangeHandler = (evt) => {

    const offerId = evt.target.id;
    if (!this._state.offers.includes(offerId)) {
      this._setState({
        offers: [...this._state.offers, offerId],
      });
    } else {
      this._setState({
        offers: [...this._state.offers.filter((offer) => offer !== offerId)],
      });
    }
  };

}
