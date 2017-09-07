import requestCreator from 'core/request'
import Common from '../stores/Common'
import Account from '../stores/Account'
import Todos from '../stores/Todos'

export default (state) => {
  const request = requestCreator(state.account.token)
  return {
    state,
    store: {
      common: new Common(request, state),
      account: new Account(request, state),
      todos: new Todos(request, state),
    }
  }
}
