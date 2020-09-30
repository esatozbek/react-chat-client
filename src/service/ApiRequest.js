import axios from 'axios';

const API_URL = 'http://localhost:8080';

class ApiRequest {
  constructor() {
    let service = axios.create({
      // headers: {csrf: 'token'}
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error)
  }

  redirectTo (document, path) {
    document.location = path
  }
  
  get(path) {
    return this.service.get(API_URL + path);
  }

  patch(path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: API_URL + path,
      responseType: 'json',
      data: payload
    });
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: API_URL + path,
      responseType: 'json',
      data: payload
    });
  }
}

export default new ApiRequest();