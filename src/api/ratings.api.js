import Api from './api.base';

const resource = 'rating';

/**
 * @name Class RatingsApi
 * @extends Api
 */
export default class RatingsApi extends Api {
  constructor() {
    super(resource);
  }

  add = async body => {
    try {
      const response = await this.create(body, 'rating/add');
      if (response.error === 'Unauthorized') {
        this.logout();
      }
      if (response.message || response.error) {
        console.log('response', response);
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
