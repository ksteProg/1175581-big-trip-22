import { createElement } from '../../render.js';

function createEventPhotoTemlate(photo) {
  return `<img class="event__photo"
  src="${photo}" alt="Event photo">`;
}

export default class EventPhotoView {
  constructor(photo) {
    this.photo = photo;
  }

  getTemplate() {
    return createEventPhotoTemlate(this.photo);
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
