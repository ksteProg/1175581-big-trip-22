import { createElement } from '../../render.js';

function createEventPhotosTapeTemlate() {
  return `<div class="event__photos-tape">
  </div>`;
}

export default class EventPhotosTapeView {

  getTemplate() {
    return createEventPhotosTapeTemlate();
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
