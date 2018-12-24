import config from '../../config';

/**
 * @name Class Api
 * @description Provides basic CRUD operations
 * @param {String(Url)} resource e.g api/users
 */

export default class Api {
  constructor(resource) {
    this.resource = resource;
    this.backendUrl = config.endpoint;
  }

  getHeaders = async () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  create = async body =>
    fetch(`${this.backendUrl}/${this.resource}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: await this.getHeaders()
    }).then(raw => raw.json());

  update = async (_id, body) =>
    fetch(`${this.backendUrl}/${this.resource}/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: await this.getHeaders()
    }).then(raw => raw.json());

  getList = async () =>
    fetch(`${this.backendUrl}/${this.resource}`, {
      headers: await this.getHeaders()
    }).then(raw => raw.json());

  getOne = async _id =>
    fetch(`${this.backendUrl}/${this.resource}/${_id}`, {
      headers: await this.getHeaders()
    }).then(raw => raw.json());

  remove = async _id =>
    fetch(`${this.backendUrl}/${this.resource}/${_id}`, {
      method: 'DELETE',
      headers: await this.getHeaders()
    });

  request = (url, params) =>
    fetch(
      `${this.backendUrl}/${url}`,
      Object.assign(
        {
          headers: this.getHeaders()
        },
        params
      )
    ).then(raw => raw.json());
}
