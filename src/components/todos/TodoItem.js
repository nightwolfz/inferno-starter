import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['todos'])
class TodoItem extends Component {
    render({ todos, item }) {
        return <li className="todo">
            <div className="view">
                <label>{item.text}</label>
                <button className="destroy" onClick={(e) => todos.remove(item)}/>
            </div>
        </li>
    }
}

export default TodoItem
