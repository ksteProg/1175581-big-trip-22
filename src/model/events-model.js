import { getRandomEvents } from '../mocks/events';

const EVENTS_COUNT = 5;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomEvents);

  getEvents() {
    return this.events;
  }
}
