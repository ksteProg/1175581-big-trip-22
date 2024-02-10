import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { sortByDate } from '../utils/utils.js';

function createTripInfoTemplate(destinations, events, totalPrice) {
  let eventsToShow = [];
  const tripEvents = [...events].sort(sortByDate);
  if (events.length > 3) {
    eventsToShow.push(tripEvents[0], tripEvents[tripEvents.length - 1]);
  } else {
    eventsToShow = tripEvents;
  }

  const destinationIds = eventsToShow.map((event) => event.destination);
  const destinationNames = destinationIds.map((destinationId) => destinations.find((destination) => destination.id === destinationId).name);

  const dateFrom = dayjs(eventsToShow[0].dateFrom).format('D MMM');
  const dateTo = dayjs(eventsToShow[eventsToShow.length - 1].dateTo).format('D MMM');

  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${destinationNames.map((destinationName) => `${destinationName} - `).join('').slice(0, -3)}</h1>

    <p class="trip-info__dates">${`${dateFrom} - ${dateTo}`}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`
  );
}

export default class TripInfoView extends AbstractView {
  #destinations = null;
  #events = null;
  #totalPrice = null;
  constructor({ destinations, events, totalPrice }) {
    super();
    this.#destinations = destinations;
    this.#events = events;
    this.#totalPrice = totalPrice;
  }


  get template() {
    return createTripInfoTemplate(this.#destinations, this.#events, this.#totalPrice,);
  }
}
