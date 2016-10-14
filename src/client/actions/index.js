import requestCreator from 'core/helpers/request'
import Common from './common'
import Todos from './todos'
import Account from './account'

// All our actions are listed here
export default (state = {}, token) => {
    const request = requestCreator(state.common.hostname, token)
    return {
        common: new Common(request, state.common),
        todos: new Todos(request, state.todos),
        account: new Account(request, state.account)
    }
}
