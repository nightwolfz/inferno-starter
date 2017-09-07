import { extendObservable, toJS } from 'mobx'

/**
 * This is our state, we update it
 * using the methods from other stores
 */
export default class State {
  constructor(state) {
    extendObservable(this, {

      account: {
        username: null,
        token: null,
        users: []
      },
      common: {
        title: 'Inferno-starter',
        statusCode: 200,
        hostname: 'localhost'
      },
      todos: []

    }, state)
  }
}
