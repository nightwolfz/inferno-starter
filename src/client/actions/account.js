import fp from 'lodash/fp'

/**
 * @name Account
 * @class Account
 */
export default class Account {

    constructor(state, request) {
        this.state = state
        this.request = request
    }

    isLoggedIn() {
        return !!this.state.account
    }

    find(username) {
        return fp.find(this.state.users, { username })
    }

    login(params) {
        return this.request('api/account/login', params)
                   .then(result => {
                        this.state.account = result
                    })
    }

    logout() {
        return this.request('api/account/logout')
                   .then(() => {
                       if (this.state.account) {
                           this.state.account = null
                       }
                       window.location.href = '/'
                   })
    }

    register(params)
    {
        return this.request('api/account/register', params)
                   .then(result => fp.assign(this.state.account, result))
    }
}

