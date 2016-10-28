import { extendObservable, asFlat } from 'mobx'

/**
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
        return size(this.username)
    }

    find(username) {
        return find(this.users, { username })
    }

    login(params) {
        return this.request('api/account/login', params).then(account => {
           extendObservable(this, account)
           return Promise.resolve()
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
