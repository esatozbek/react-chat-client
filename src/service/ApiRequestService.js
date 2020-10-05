import LocalStorageService from "./LocalStorageService";

const API_URL = "http://localhost:8080";

class ApiRequest {
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

  handleResponse(resp) {
    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("Request error");
    }
    return resp.json();
  }

  get(path) {
    return fetch(API_URL + path, {
      method: "GET",
      headers: this.prepareHeaders(),
    }).then((resp) => this.handleResponse(resp));
  }

  patch(path, payload) {
    return fetch(API_URL + path, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: this.prepareHeaders(),
    }).then((resp) => resp.json());
  }

  post(path, payload) {
    return fetch(API_URL + path, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: this.prepareHeaders(),
    }).then((resp) => this.handleResponse(resp));
  }

  getStream(path, callback) {
    fetch(API_URL + path, {
      method: "GET",
      headers: this.prepareHeaders(),
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
      .catch(() => {
        setTimeout(() => {
          this.getStream(path, callback);
        }, 2500);
      });
  }
}

export default new ApiRequest();
