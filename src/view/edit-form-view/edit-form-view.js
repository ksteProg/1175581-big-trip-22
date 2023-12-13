import { createElement } from '../../render.js';

function createEditFormTemplate() {
  return (`<form class="event event--edit" action="#" method="post">
      </form>`
  );
}

export default class EditFormView {

  getTemplate() {
    return createEditFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
