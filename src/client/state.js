import { observable, extendObservable, asFlat, toJS } from 'mobx'

// Default state structure
const defaultState = observable({
    app: {
        title: 'Mobx-starter',
        statusCode: 200,
        hostname: 'localhost'
    },
    account: {},
    todos: {
        loading: false,
        items: asFlat([])
    }
})

// Export function that creates our state
module.exports = function createState(state) {
    return process.env.BROWSER ? extendObservable(defaultState, state) : toJS(defaultState)
}
