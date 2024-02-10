import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/const.js';

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click «ADD NEW EVENT» in menu to create your first event',
  [FilterType.FUTURE]: 'There are no events in future',
  [FilterType.PRESENT]: 'There are no events now',
  [FilterType.PAST]: 'There are no events in past',
};

function createNoEventsTemplate(filterType) {
  const noEventsTextValue = NoEventsTextType[filterType];
  return (
    `<p class="trip-events__msg">${noEventsTextValue}</p>`
  );
}

export default class NoEventsView extends AbstractView {

  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsTemplate(this.#filterType);
  }
}
