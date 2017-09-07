import { autorun } from 'mobx'

export default function({ state }) {

  // Update document title whenever it changes
  autorun(() => {
    if (state.common.title) {
      document.title = state.common.title
    }
  })
}
