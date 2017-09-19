import { isObservableArray } from 'mobx'
import { inject, observer } from 'inferno-mobx'

global.connect = function(...stores) {
  return function(component) {
    if (stores && stores.length) {
      return inject(...stores)(observer(component))
    }
    return observer(component)
  }
}

global.Exception = class Exception extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'Exception2';
  }
}

global.size = function size(input) {
  if (isObservableArray(input) || typeof input === 'string') {
    return input.length
  }
  return input && ((typeof input === 'string') ? input.length : Object.keys(input).length)
}
