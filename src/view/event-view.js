import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDurationTime } from '../utils/utils.js';
import dayjs from 'dayjs';

function createOfferTemplate(offersByType, offer) {

  return `<li class="event__offer">
  <span class="event__offer-title">${offersByType.find((offerByType) => offerByType.id === offer).title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offersByType.find((offerByType) => offerByType.id === offer).price}</span>
</li>`;
}

function createEventTemplate(destinations, allOffers, event) {

  const { basePrice, dateFrom, dateTo, isFavorite, type, offers } = event;
  const destination = destinations.find((dest) => event.destination === dest.id);
  const offersByType = allOffers.find((item) => item.type === type).offers;


  const timeFrom = dayjs(dateFrom).format('hh:mm');
  const timeTo = dayjs(dateTo).format('hh:mm');


  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${event.destination === '' ? '' : destination.name }</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
      </p>
      <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.map((offer) => createOfferTemplate(offersByType, offer)).join('')}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
  );
}

export default class EventView extends AbstractStatefulView {
  #destinations = null;
  #allOffers = null;
  #event = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ destinations, allOffers, event, onEditClick, onFavoriteClick }) {
    super();
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    this.#event = event;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(this.#destinations, this.#allOffers, this.#event);
  }


  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
