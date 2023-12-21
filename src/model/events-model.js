import { POINTS } from '../mocks/points.js';

export default class EventsModel {
  points = POINTS;

  getPoints() {
    return this.points;
  }
}
