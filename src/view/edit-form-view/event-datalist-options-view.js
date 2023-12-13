import { createElement } from '../../render.js';

function createEventDataListOptionsTemplate(city) {
  return `<option value="${city}">
  </option>`;
}

export default class EventDataListOptionsView {
  constructor(city) {
    this.city = city;
  }

  getTemplate() {
    return createEventDataListOptionsTemplate(this.city);
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
