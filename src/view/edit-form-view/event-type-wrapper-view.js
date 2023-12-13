import { createElement } from '../../render.js';

function createEventTypeWrapperTemlate(destination) {
  const { type } = destination;
  return `<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  </div>`;
}

export default class EventTypeWrapperView {
  constructor(destination) {
    this.destination = destination;
  }
  getTemplate() {
    return createEventTypeWrapperTemlate(this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
