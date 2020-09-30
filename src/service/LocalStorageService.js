class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.setItem();
  }
}

export default new LocalStorageService();