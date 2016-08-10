import requestCreator from '../../shared/request'
import Todos from './todos'
import Account from './account'

/**
 * All our stores with actions go here
 * @param state
 * @returns {{todos: Todos, account: Account}}
 */
export default (state) => {
    const request = requestCreator(state)
    return {
        todos: new Todos(state, request),
        account: new Account(state, request)
    }
}
