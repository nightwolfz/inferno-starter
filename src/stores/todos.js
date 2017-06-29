import request from 'core/request'
import { extendObservable } from 'mobx'

/**
 * @class Todos
 */
export default class Todos {

  constructor(state = {}) {
    extendObservable(this, {
      loading: false,
      items: []
    }, state)
  }

  map(predicate) {
    return this.items.map(predicate)
  }

  async add(text) {
    const result = await request.post(`/api/todos/add`, { text })
    // Add to list
    this.items.push({
      _id: result._id,
      text: result.text
    })
  }

  async remove(item) {
    try {
      console.warn('Removing', item._id)
      await request.post(`/api/todos/remove`, { _id: item._id })
      this.items.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  async browse() {
    this.items = await request.get(`/api/todos`)
  }
}
