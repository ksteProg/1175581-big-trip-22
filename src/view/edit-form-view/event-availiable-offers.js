import { createElement } from '../../render.js';

function createEventAvailableOffersTemlate() {
  return `<div class="event__available-offers">
  </div>`;
}

export default class EventAvailableOffersView {

  getTemplate() {
    return createEventAvailableOffersTemlate();
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
