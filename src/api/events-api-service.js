import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'date_From': event.dateFrom instanceof Date ? event.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
      'date_to': event.dateTo instanceof Date ? event.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
      'is_favorite': event.isFavorite,
      'base_price': event.basePrice,
    };

    // Ненужные ключи мы удаляем
    delete adaptedEvent.dueDate;
    delete adaptedEvent.isArchive;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.repeating;

    return adaptedEvent;
  }
}
