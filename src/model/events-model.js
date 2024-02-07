import Observable from '../framework/observable.js';
import { UpdateType } from '../mocks/const.js';
import { EVENTS } from '../mocks/events.js';
import { getRandomArrayElement } from '../mocks/utils.js';

export default class EventsModel extends Observable {
  #events = [];
  #offers = [];
  #destinations = [];
  #event = getRandomArrayElement(EVENTS);
  #eventsApiService = null;

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);

      const offers = await this.#eventsApiService.offers;
      this.#offers = offers.map(this.#adaptToClient);

      const destinations = await this.#eventsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch (err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get types() {
    return this.#offers.map((item) => item.type);
  }

  get destinations() {
    return this.#destinations;
  }

  get event() {
    return this.#event;
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }

  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'], // На клиенте дата хранится как экземпляр Date,
      isFavorite: event['is_favorite'],
      basePrice: event['base_price'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];
    delete adaptedEvent['base_price'];

    return adaptedEvent;
  }
}
