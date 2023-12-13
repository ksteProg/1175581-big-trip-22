import { createElement } from '../../render.js';

function createEventPhotosContainerTemlate() {
  return `<div class="event__photos-container">
  </div>`;
}

export default class EventPhotosContainerView {

  getTemplate() {
    return createEventPhotosContainerTemlate();
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
