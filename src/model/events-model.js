import Observable from '../framework/observable.js';
import { UpdateType } from '../mocks/const.js';

export default class EventsModel extends Observable {
  #events = [];
  #offers = [];
  #destinations = [];
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

  get destinations() {
    return this.#destinations;
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

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [
        newEvent,
        ...this.#events,
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add event');
    }

  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }

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
