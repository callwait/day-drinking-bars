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
}
