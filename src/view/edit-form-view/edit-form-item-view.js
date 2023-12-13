import { createElement } from '../../render.js';

function createEditFormItemTemplate() {
  return `<li class="trip-events__item">
  </li>`;
}

export default class EditFormItemView {

  getTemplate() {
    return createEditFormItemTemplate();
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
