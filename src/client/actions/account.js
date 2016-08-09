import find from 'lodash/fp/find'
import isEmpty from 'lodash/fp/isEmpty'

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
        return !isEmpty(this.state.account)
    }

    find(username) {
        return find(this.state.users, { username })
    }

    login(params) {
        return this.request('api/account/login', params)
                   .then(account => {
                       this.state.account = account
                       document.cookie = 'token=' + account.token;
                    })
    }

    logout() {
        return this.request('api/account/logout')
                   .then(() => {
                       if (this.state.account) {
                           this.state.account = null
                           document.cookie = 'token='
                       }
                       setTimeout(() => window.location.href = '/', 2000)
                   })
    }

    register(params) {
        return this.request('api/account/register', params)
                   .then(account => this.state.account = account)
    }
}
