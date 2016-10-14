import { extendObservable } from 'mobx'
import { find, isEmpty } from 'lodash'

/**
 * @name Account
 * @class Account
 */
export default class Account {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            username: null,
            token: null,
            users: []
        }, state)
    }

    isLoggedIn() {
        return !isEmpty(this.username)
    }

    find(username) {
        return find(this.users, { username })
    }

    login(params) {
        return this.request('api/account/login', params)
                   .then(account => {
                       extendObservable(this, account)
                       setTimeout(() => window.location.href = '/', 1000)
                   })
    }

    logout() {
        return this.request('api/account/logout')
                   .then(() => {
                       if (this.profile) {
                           this.username = null
                           this.token = null
                       }
                       setTimeout(() => window.location.href = '/', 1000)
                   })
    }

    register(params) {
        return this.request('api/account/register', params)
                   .then(account => {
                       extendObservable(this, account)
                   })
    }
}
