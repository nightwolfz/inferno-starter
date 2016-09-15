import { observable, asFlat, toJS } from 'mobx'
import mergeObservables from './helpers/mergeObservables'

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

// Export function that creates our server tate
export const createServerState = () => toJS(defaultState)

// Export function that creates our client state
export const createClientState = () => mergeObservables(defaultState, window.__STATE)
