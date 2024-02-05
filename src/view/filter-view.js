import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${filter.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}"
    ${filter.type === currentFilterType ? 'checked' : ''}
    ${filter.count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter.type.toLowerCase()}">${filter.type}</label>
  </div>`
  );
}

function createFilterTemplate(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">

    ${filters.map((filter) => createFilterItemTemplate(filter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);

  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
