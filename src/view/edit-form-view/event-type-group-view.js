import { createElement } from '../../render.js';

function createEventTypeGroupTemlate() {
  return `<fieldset class="event__type-group">
  <legend class="visually-hidden">Event type</legend>

</fieldset>`;
}

export default class EventTypeGroupView {

  getTemplate() {
    return createEventTypeGroupTemlate();
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
