import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EditFormItemView from '../view/edit-form-view/edit-form-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';
import EventHeaderView from '../view/edit-form-view/event-header-view.js';
import EventPriceFieldTView from '../view/edit-form-view/event-price-field-view.js';
import EventTimeFieldView from '../view/edit-form-view/event-time-field-view.js';
import EventDestinationFieldTView from '../view/edit-form-view/event-destination-field-view.js';
import EventDataListTView from '../view/edit-form-view/event-datalist-view.js';
import EventDataListOptionsView from '../view/edit-form-view/event-datalist-options-view.js';
import EventTypeWrapperView from '../view/edit-form-view/event-type-wrapper-view.js';
import EventTypeListView from '../view/edit-form-view/event-type-list-view.js';
import EventTypeGroupView from '../view/edit-form-view/event-type-group-view.js';
import EventTypeItemView from '../view/edit-form-view/event-type-item-view.js';
import EventDetailsView from '../view/edit-form-view/event-details-view.js';
import EventOffersView from '../view/edit-form-view/event-offers-view.js';
import EventDestinationView from '../view/edit-form-view/event-destination-view.js';
import EventPhotosContainerView from '../view/edit-form-view/event-photos-container-view.js';
import EventPhotosTapeView from '../view/edit-form-view/event-photos-tape-view.js';
import EventPhotoView from '../view/edit-form-view/event-photo.js';
import EventAvailableOffersView from '../view/edit-form-view/event-availiable-offers.js';
import EventOfferView from '../view/edit-form-view/event-offer-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';


export default class TripPresenter {
  eventsListComponent = new EventsListView();
  editFormItemComponent = new EditFormItemView();
  editFormComponent = new EditFormView();
  eventHeaderComponent = new EventHeaderView();
  eventDataListComponent = new EventDataListTView();
  eventTypelistComponent = new EventTypeListView();
  eventTypeGroupComponent = new EventTypeGroupView();
  eventDetailsComponent = new EventDetailsView();
  eventsOffersComponent = new EventOffersView();
  eventsAvailableOffersComponent = new EventAvailableOffersView();
  eventPhotoContainerComponent = new EventPhotosContainerView();
  eventPhotoTapeComponent = new EventPhotosTapeView();


  constructor({ tripElement, eventsElement, filtersElement, eventsModel, editFormModel }) {
    this.tripElement = tripElement;
    this.filtersElement = filtersElement;
    this.eventsElement = eventsElement;
    this.eventsModel = eventsModel;
    this.editFormModel = editFormModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.formData = this.editFormModel.getEditFormData();
    this.eventTypeWrapperComponent = new EventTypeWrapperView(this.formData.destination);
    this.eventDestinationComponent = new EventDestinationView(this.formData.destination);
    this.eventDestinationFieldComponent = new EventDestinationFieldTView(this.formData.destination);
    render(new TripInfoView(), this.tripElement, 'afterbegin');
    render(new FilterView(), this.filtersElement);
    render(new SortView(), this.eventsElement);
    render(this.eventsListComponent, this.eventsElement);
    render(this.editFormItemComponent, this.eventsListComponent.getElement());
    render(this.editFormComponent, this.editFormItemComponent.getElement());
    render(this.eventHeaderComponent, this.editFormComponent.getElement());
    render(new EventPriceFieldTView(), this.eventHeaderComponent.getElement(), 'afterbegin');
    render(new EventTimeFieldView(), this.eventHeaderComponent.getElement(), 'afterbegin');
    render (this.eventDestinationFieldComponent, this.eventHeaderComponent.getElement(), 'afterbegin');
    render (this.eventDataListComponent, this.eventDestinationFieldComponent.getElement());
    render(this.eventTypeWrapperComponent, this.eventHeaderComponent.getElement(), 'afterbegin');
    render(this.eventTypelistComponent, this.eventTypeWrapperComponent.getElement());
    render(this.eventTypeGroupComponent, this.eventTypelistComponent.getElement());
    render(this.eventDetailsComponent, this.editFormComponent.getElement());
    render(this.eventsOffersComponent, this.eventDetailsComponent.getElement());
    render(this.eventDestinationComponent, this.eventDetailsComponent.getElement());
    render(this.eventPhotoContainerComponent, this.eventDestinationComponent.getElement());
    render(this.eventPhotoTapeComponent, this.eventPhotoContainerComponent.getElement());
    render(this.eventsAvailableOffersComponent, this.eventsOffersComponent.getElement());

    for(let i = 0; i < this.formData.cities.length; i++) {
      render(new EventDataListOptionsView(this.formData.cities[i]), this.eventDataListComponent.getElement());
    }

    for(let i = 0; i < this.formData.destination.photos.length ; i++) {
      render(new EventPhotoView(this.formData.destination.photos[i]), this.eventPhotoTapeComponent.getElement());
    }

    for (let i = 0; i < this.formData.offers.length; i++) {
      render(new EventOfferView(this.formData.offers[i]),this.eventsAvailableOffersComponent.getElement());
    }

    for (let i = 0; i < this.formData.types.length ; i++) {
      render(new EventTypeItemView(this.formData.types[i]), this.eventTypeGroupComponent.getElement());
    }

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView(this.events[i]), this.eventsListComponent.getElement());
    }
  }
}
