import Common from '../stores/common'
import Todos from '../stores/todos'
import Account from '../stores/account'

// All our stores are listed here
function createStores(state, token) {
    return {
        common: new Common(state.common),
        todos: new Todos(state.todos),
        account: new Account(state.account)
    }
}

// Initialize actions and state
export default process.env.BROWSER ? createStores(window.__STATE) : createStores
