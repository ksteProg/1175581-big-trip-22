import { createElement } from '../../render.js';

function createEventTypeListTemlate() {
  return `<div class="event__type-list">
  </div>`;
}

export default class EventTypeListView {

  getTemplate() {
    return createEventTypeListTemlate();
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
