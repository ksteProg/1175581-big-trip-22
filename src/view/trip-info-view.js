import AbstractView from '../framework/view/abstract-view.js';
import { sortByDate } from '../utils/utils.js';

function createTripInfoTemplate(destinations, events, totalPrice) {
  let eventsToShow = [];
  const tripEvents = [...events].sort(sortByDate);
  // console.log(events);
  // console.log([...events].sort(sortByDate));
  if (events.length > 3) {
    eventsToShow.push(tripEvents[0], tripEvents[tripEvents.length - 1]);
    // const dfd = eventsToShow.sort(sortByDate);
    // userDestinations = destinations.filter((destination) => destinationIds.includes(destination.id));
  } else {
    eventsToShow = tripEvents;
    // userDestinations = destinations.filter((destination) => destinationIds.includes(destination.id));
  }

  const destinationIds = eventsToShow.map((event) => event.destination);

  const userDestinations = destinations.filter((destination) => destinationIds.includes(destination.id));

  const rrr = destinations.map((destination) => destinationIds.find((destinationId) => destinationId === destination.id));
  console.log(rrr);
  console.log(eventsToShow);
  console.log(destinationIds);
  console.log(destinations);
  console.log(userDestinations);




  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${userDestinations.map((userDestination) => `${userDestination.name}-`).join('').slice(0,-1)}</h1>

    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
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
