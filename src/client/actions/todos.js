import { remove } from 'lodash/fp'

/**
 * @name Todos
 * @class Todos
 */
export default class Todos {

    constructor(state, request) {
        this.state = state
        this.request = request
    }

    add(text) {
        return this.request(`api/todos/add`, { text })
                   .then(result => {
                        // Add to list
                        this.state.todos.items.push({
                            _id: result._id,
                            text: result.text
                        })
                    })
    }

    remove(item) {
        console.warn('Removing', item._id)
        return this.request(`api/todos/remove`, { _id: item._id })
                   .then(() => {
                        this.state.todos.items.remove(item)
                    })
    }

    browse() {
        return this.request(`api/todos`)
    }
}
