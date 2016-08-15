import requestCreator from '../../shared/request'
import Todos from './todos'
import Account from './account'

/**
 * All our actions with actions go here
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
