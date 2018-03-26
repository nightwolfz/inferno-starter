import { extendObservable, decorate, observable } from 'mobx'

/**
 * This is our state, we update it
 * using the methods from other stores
 */
class State {
  constructor(state) {
    Object.assign(this, {
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

export default decorate(State, {
  account: observable,
  common: observable,
  todos: observable,
})
