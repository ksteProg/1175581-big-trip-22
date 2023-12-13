import { createElement } from '../../render.js';

function createEventDataListTemplate() {
  return `<datalist id="destination-list-1">
</datalist>`;
}

export default class EventDataListTView {
  getTemplate() {
    return createEventDataListTemplate();
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
