import { extendObservable, asFlat } from 'mobx'
import _ from 'underscore'

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
            users: asFlat([])
        }, state)
    }

    isLoggedIn() {
        return !_.isEmpty(this.username)
    }

    find(username) {
        return find(this.users, { username })
    }

    login(params) {
        return this.request('api/account/login', params)
                   .then(account => {
                       extendObservable(this, account)
                   })
    }

    logout() {
        return this.request('api/account/logout')
                   .then(() => {
                       this.username = null
                       this.token = null
                   })
    }

    register(params) {
        return this.request('api/account/register', params)
                   .then(account => {
                       extendObservable(this, account)
                   })
    }
}
