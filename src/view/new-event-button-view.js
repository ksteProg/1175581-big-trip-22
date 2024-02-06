import AbstractView from '../framework/view/abstract-view';
function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;

    const aa = this.element.querySelector('.trip-main__event-add-btn');
    const ff = document.querySelector('.trip-main__event-add-btn');
    this.element.addEventListener('click', this.#clickHandler);

    console.log('aa', aa);
    console.log('ff', ff);
    console.log('thisEl', this.element);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    console.log('sdfsdf');
    evt.preventDefault();
    this.#handleClick();
  };
}
