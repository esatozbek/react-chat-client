import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const API_URL = "http://localhost:8080";

class ApiRequest {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  prepareHeaders() {
    const headers = {};
    const user = LocalStorageService.getItem("user");
    if (user) {
      const userId = JSON.parse(user).id;
      headers["x-user-id"] = userId;
    }
    return headers;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  redirectTo(document, path) {
    document.location = path;
  }

  get(path) {
    return this.service.request({
      method: "GET",
      url: API_URL + path,
      headers: this.prepareHeaders(),
    });
  }

  patch(path, payload) {
    return this.service.request({
      method: "PATCH",
      url: API_URL + path,
      responseType: "json",
      data: JSON.stringify(payload),
      headers: this.prepareHeaders(),
    });
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: API_URL + path,
      responseType: "json",
      data: payload,
      headers: this.prepareHeaders(),
    });
  }
}

export default new ApiRequest();
