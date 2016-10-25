import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['actions', 'state'])
class TodoItem extends Component {

    componentDidMount() {
    }

    render() {
        const { todos } = this.props.actions
        const { item } = this.props

        return <li className="todo">
            <div className="view">
                <label>{item.text}</label>
                <button className="destroy" onClick={(e) => todos.remove(item)}/>
            </div>
        </li>
    }
}

export default TodoItem
