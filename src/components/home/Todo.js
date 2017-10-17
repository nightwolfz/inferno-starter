import Inferno, { Component } from 'inferno'

@connect('store')
class Todo extends Component {
  render({ store, item }) {
    return (
      <li className="todo">
        <div className="view">
          <label>{item.text}</label>
          <button className="destroy" onClick={(e) => store.todos.remove(item)}/>
        </div>
      </li>
    )
  }
}

export default Todo
