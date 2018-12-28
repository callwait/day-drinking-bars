import config from '../../config';
import { AsyncStorage, Alert } from 'react-native';

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
    authorization: (await AsyncStorage.getItem('token')) || '',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  create = async (body, path) =>
    fetch(`${this.backendUrl}/${path || this.resource}`, {
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

  request = async (url, params) =>
    fetch(
      `${this.backendUrl}/${url}`,
      Object.assign(
        {
          headers: await this.getHeaders()
        },
        params
      )
    ).then(raw => raw.json());

  logout = () => {
    //const { navigate } = this.props.navigation;
    AsyncStorage.clear();
    //navigate('LogIn');

    Alert.alert('', 'jwt token was expired, try re-login', {
      cancelable: false
    });
  };
}
