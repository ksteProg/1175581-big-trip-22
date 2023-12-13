import { createElement } from '../../render.js';

function createEventHeaderTemlate() {
  return `<header class="event__header">
  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
</header>`;
}

export default class EventHeaderView {

  getTemplate() {
    return createEventHeaderTemlate();
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
