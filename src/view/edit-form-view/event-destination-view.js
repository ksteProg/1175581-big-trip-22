import { createElement } from '../../render.js';

function createEventDestinationTemlate(destination) {
  const {description} = destination;
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
</section>`;
}

export default class EventDestinationView {
  constructor(destination) {
    this.destination = destination;
  }

  getTemplate() {
    return createEventDestinationTemlate(this.destination);
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
