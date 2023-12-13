import { EDIT_FORM_DATA } from '../mocks/edit-form.js';

export default class EditFormModel {
  editFormData = EDIT_FORM_DATA;

  getEditFormData() {
    return this.editFormData;
  }
}
