import { EVENTS } from '../mocks/events.js';
import { OFFERS } from '../mocks/offers.js';
import { DESTINATIONS } from '../mocks/destinations.js';
import { getRandomArrayElement } from '../mocks/utils.js';

export default class EventsModel {
  events = EVENTS;
  offers = OFFERS;
  destinations = DESTINATIONS;
  event = getRandomArrayElement(EVENTS);

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getTypes() {
    return this.offers.map((item) => item.type);
  }

  getOffersByType(event) {
    const offersItem = this.offers.find((item) => event.type === item.type);
    return offersItem.offers;
  }

  getOffersById(event) {
    const currentOffers = this.offers.find((offerItem) => event.type === offerItem.type);
    return event.offers.map((eventOffer) => currentOffers.offers.find((offer) => eventOffer.id === offer.id));
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(event) {
    return this.destinations.find((destination) => event.destination === destination.id);
  }

  getEvent() {
    return this.event;
  }
}