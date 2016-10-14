'use strict';

function fakeSymbol(key) {
    return key + '_Symbol'
}

const __ls = fakeSymbol('localStorage');
const __store = fakeSymbol('store');
const __window = fakeSymbol('window');
const __name = fakeSymbol('name');
const __isWriting = fakeSymbol('isWriting');
const __error = fakeSymbol('error');

function isWindowAndHasLS(window) {
  return window && window.localStorage;
}

function isValidObject(object) {
  return object && typeof object === "object" && !Array.isArray(object) && !(object instanceof Error);
}

function logError(error) {
  console.error(error);
}

function error(message) {
  return new Error(message);
}

function keyIsNotAString() {
  return error("key should be a string");
}

function isKeyAString(key) {
  return typeof key === "string";
}

class Store {

  /*
   * from object to string
   * @param {object}
   */
  static serialize(data) {
    return JSON.stringify(data);
  }

  /*
   * from string to object
   * @param {string}
   */
  static deserialize(string) {
    return JSON.parse(string);
  }

  /*
   * cone object
   * @param {obj}
   */
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /*
   * @param {string} name of local storage item
   */
  constructor(name) {
    if (!isWindowAndHasLS(window)) {
      return logError(error("window or localStorage is not defined!"));
    }

    this[__window] = window;
    this[__name] = name;
    this[__isWriting] = false;
    this[__error] = null;
    this[__ls] = this[__window].localStorage;
    this[__store] = this.__getAndDeserialize();

    if (!isValidObject(this[__store])) {
      this[__store] = {};

      this.__serializeAndSet();

      if (this[__error]) {
        this.destructor(true);

        return this[__error];
      }
    }

    this.__changeStorageHandler = this.__changeStorageHandler.bind(this);

    this[__window].addEventListener("storage", this.__changeStorageHandler);
  }

  /*
   * Remove event listener
   * @param {boolean} if true, local storage item will be removed
   */
  destructor(removeStorage) {
    this[__window].removeEventListener("storage", this.__changeStorageHandler);

    if (removeStorage) {
      this[__ls].removeItem(this[__name]);
    }

    delete this[__window];
    delete this[__name];
    delete this[__ls];
    delete this[__store];
    delete this[__isWriting];
  }

  /*
   * you can use multikey: set('boo.bar.baz', 10)
   * @param {string} value of key which you want set
   * @param {object|number|string|boolean} val which you want set
   */
  set(key, val) {
    if (!isKeyAString(key)) {
      return keyIsNotAString();
    }

    let store = this[__store];
    let parts = key.split('.');
    let lastKey = parts.pop();
    let _val = typeof val === "object" ? Store.clone(val) : val;

    if (typeof val === "function") {
      _val = val();
    }

    if (_val === undefined) {
      return this.remove(key);
    }

    parts.forEach(_key => {
      if (!isValidObject(store[_key])) {
        store[_key] = {};
      }

      store = store[_key];
    });

    store[lastKey] = _val;

    this[__isWriting] = true;

    this.__serializeAndSet();

    if (this[__error]) {
      return this[__error];
    }

    return _val;
  }

  /*
   * you can use multikey: get('boo.bar.baz', 10)
   * @param {string} value of key which you want get
   * @param {object|number|string|boolean} defaultValue if key is undefined
   */
  get(key, defaultValue) {
    if (!arguments.length) {
      return this.getAll();
    }

    if (!isKeyAString(key)) {
      return keyIsNotAString();
    }

    let store = this[__store];
    let parts = key.split(".");
    let lastKey = parts.pop();

    for (let i = 0; i < parts.length; i++) {
      let _key = parts[i];

      if (store.hasOwnProperty(_key) && isValidObject(store[_key])) {
        store = store[_key];
      } else {
        return defaultValue;
      }
    }

    store = store[lastKey];

    if (store === undefined) {
      return defaultValue;
    }

    return typeof store === "object" ? Store.clone(store) : store;
  }

  /*
   * return all local storage data
   */
  getAll() {
    return Store.clone(this[__store]);
  }

  /*
   * you can use multikey: remove('boo.bar.baz')
   * @param {string} value of key which you want remove
   */
  remove(key) {
    if (!arguments.length) {
      return this.clear();
    }

    if (!isKeyAString()) {
      return keyIsNotAString();
    }

    let store = this[__store];
    let parts = key.split('.');
    let lastKey = parts.pop();
    let val;

    for (let i = 0; i < parts.length; i++) {
      let _key = parts[i];

      if (store.hasOwnProperty(_key) && isValidObject(store[_key])) {
        store = store[_key];
      } else {
        return;
      }
    }

    val = store[lastKey];

    delete store[lastKey];

    this.__serializeAndSet();

    if (this[__error]) {
      return this[__error];
    }

    return val;
  }

  /*
   * Clears local storage.
   */
  clear() {
    let store = this[__store];

    this[__store] = {};
    this.__serializeAndSet();

    return store;
  }

  __getAndDeserialize() {
    try {
      return Store.deserialize(this[__ls].getItem(this[__name]));
    } catch (e) {
      this[__error] = error("Error when trying to get data from localStorage!");

      logError(this[__error]);

      return this[__error];
    }
  }

  __serializeAndSet() {
    try {
      this[__ls].setItem(this[__name], Store.serialize(this[__store]));
      this[__error] = null;
    } catch (e) {
      this[__error] = error("Error when trying to set data to localStorage!");

      logError(this[__error]);
    }
  }

  __changeStorageHandler(event) {
    if (event.key !== this[__name] || this[__isWriting]) {
      this[__isWriting] = false;
      return;
    }

    let store = this.__getAndDeserialize();

    if (!isValidObject(store)) {
      return;
    }

    this[__store] = store;
  }
}

const mockStore = {
    get(){},
    set(){}
}

export default process.env.BROWSER ? new Store('binder') : mockStore;
