import Api from './api.base';

const resource = 'places';

/**
 * @name Class PlacesApi
 * @extends Api
 */
export default class PlacesApi extends Api {
  constructor() {
    super(resource);
  }

  getNearPlaces = async (lat, long) => {
    try {
      const response = await this.request(
        `places/near?lat=${lat}&long=${long}`
      );
      console.log('response', response);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  fetchPlace = async id => {
    try {
      const response = await this.request(`place/${id}`);
      console.log(response);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  addPlace = async body => {
    try {
      const response = await this.create(body, 'places/add');
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
