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
      if (response.error === 'Unauthorized') {
        this.logout();
      }
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
