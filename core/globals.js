import { isObservableArray } from 'mobx'

global.Exception = class Exception extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'Exception';
  }
}

global.size = function size(input) {
  if (isObservableArray(input) || typeof input === 'string') {
    return input.length
  }
  return input && ((typeof input === 'string') ? input.length : Object.keys(input).length)
}
