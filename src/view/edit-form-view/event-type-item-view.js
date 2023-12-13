import { createElement } from '../../render.js';

function createEventTypeItemTemplate(type) {
  return `<div class="event__type-item">
  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--type" for="event-type-bus-1">${type}</label>
  </div>
  `;
}

export default class EventTypeItemView {
  constructor(type) {
    this.type = type;
  }

  getTemplate() {
    return createEventTypeItemTemplate(this.type);
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
