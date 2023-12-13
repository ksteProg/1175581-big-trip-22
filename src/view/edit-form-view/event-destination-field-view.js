import { createElement } from '../../render.js';

function createEventDestinationFieldTemplate(destination) {
  const {name, type} = destination;
  return `<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>
  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
</div>`;
}

export default class EventDestinationFieldTView {
  constructor(destination) {
    this.destination = destination;
  }

  getTemplate() {
    return createEventDestinationFieldTemplate(this.destination);
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
