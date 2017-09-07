import state from './State'

export default class Common {
  setTitle(newTitle) {
    state.common.title = newTitle
  }
}
