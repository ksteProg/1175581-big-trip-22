import { EVENTS } from '../mocks/events.js';
import { OFFERS } from '../mocks/offers.js';
import { DESTINATIONS } from '../mocks/destinations.js';
import { getRandomArrayElement } from '../mocks/utils.js';

export default class EventsModel {
  events = EVENTS;
  offers = OFFERS;
  destinations = DESTINATIONS;
  formEvent = getRandomArrayElement(EVENTS);

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getTypes() {
    return OFFERS.map((item) => item.type);
  }

  getOffersByType(event) {
    const offersItem = OFFERS.find((item) => event.type === item.type);
    return offersItem.offers;
  }

  getOffersById(event) {
    const currentOffers = OFFERS.find((offerItem) => event.type === offerItem.type);
    return event.offers.map((eventOffer) => currentOffers.offers.find((offer) => eventOffer === offer.id));
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(event) {
    return DESTINATIONS.find((destination) => event.destination === destination.id);
  }

  getFormEvent() {
    return this.formEvent;
  }
}
