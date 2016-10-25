import { extendObservable, asFlat } from 'mobx'
import _ from 'underscore'
import history from 'core/helpers/history'

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
                       setTimeout(() => history.push('/'), 1000)
                   })
    }

    logout() {
        return this.request('api/account/logout')
                   .then(() => {
                       if (this.profile) {
                           this.username = null
                           this.token = null
                       }
                       setTimeout(() => history.push('/'), 1000)
                   })
    }

    register(params) {
        return this.request('api/account/register', params)
                   .then(account => {
                       extendObservable(this, account)
                   })
    }
}
