import Observable from '../framework/observable.js';
import { EVENTS } from '../mocks/events.js';
import { OFFERS } from '../mocks/offers.js';
import { DESTINATIONS } from '../mocks/destinations.js';
import { getRandomArrayElement } from '../mocks/utils.js';

export default class EventsModel extends Observable {
  #events = EVENTS;
  #offers = OFFERS;
  #destinations = DESTINATIONS;
  #event = getRandomArrayElement(EVENTS);

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

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
