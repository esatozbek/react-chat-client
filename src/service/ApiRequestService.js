import LocalStorageService from "./LocalStorageService";

const API_URL = "http://localhost:8080";

class ApiRequest {
  constructor() {
    this.controllers = [];
    this.timeoutIds = [];
  }

  prepareHeaders() {
    const headers = {};
    headers["Content-Type"] = "application/json";
    const user = LocalStorageService.getItem("user");
    if (user) {
      const userId = JSON.parse(user).id;
      headers["x-user-id"] = userId;
    }
    return headers;
  }

  async handleResponse(resp, resolve, reject) {
    if (resp.status !== 200 && resp.status !== 201) {
      reject(await resp.json());
    } else {
      resolve(await resp.json());
    }
  }

  async request(path, method, body) {
    return new Promise(async (resolve, reject) => {
      const resp = await fetch(API_URL + path, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: this.prepareHeaders(),
      });
      this.handleResponse(resp, resolve, reject);
    });
  }

  get(path) {
    return this.request(path, "GET");
  }

  patch(path, payload) {
    return this.request(path, "PATCH", payload);
  }

  post(path, payload) {
    return this.request(path, "POST", payload);
  }

  put(path, payload) {
    return this.request(path, "PUT", payload);
  }

  getStream(path, callback) {
    const controller = new AbortController();
    const signal = controller.signal;
    this.controllers.push(controller);
    fetch(API_URL + path, {
      method: "GET",
      headers: this.prepareHeaders(),
      signal,
    })
      .then((resp) => {
        if (resp.status !== 200 && resp.status !== 201) {
          setTimeout(() => {
            this.getStream(path, callback);
          }, 2500);
        }
        return resp.body.getReader();
      })
      .then((reader) => {
        reader.read().then(function process({ done, value }) {
          if (value && value.length && !done) {
            let result = "";
            for (let i = 0; i < value.length; i++) {
              result += String.fromCharCode(value[i]);
            }
            if (result !== "\n") {
              try {
                callback(JSON.parse(result));
              } catch (e) {}
            }
            return reader.read().then(process);
          }
        });
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          const timeoutId = setTimeout(() => {
            this.getStream(path, callback);
          }, 2500);
          this.timeoutIds.push(timeoutId);
        }
      });
  }

  cancelRequests() {
    this.controllers.forEach((controller) => controller.abort());
    this.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  }
}

export default new ApiRequest();
