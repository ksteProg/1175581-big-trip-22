import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EditFormView from './view/edit-form-view.js';
import {render} from './render.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-main');
const eventsElement = mainElement.querySelector('.trip-events');

render(new FilterView(), filtersElement);
render(new SortView(), eventsElement);
render(new EditFormView(), eventsElement);
