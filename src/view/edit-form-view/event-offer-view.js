import { createElement } from '../../render.js';

function createEventOfferTemlate(offer) {
  const { name, price, isActive } = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isActive ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">${name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">3${price}</span>
  </label>
</div>`;
}

export default class EventOfferView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemplate() {
    return createEventOfferTemlate(this.offer);
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
