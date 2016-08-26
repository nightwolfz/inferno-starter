import Inferno from 'inferno'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'
import size from 'lodash/fp/size'
import TodoAdd from './Todos/TodoAdd'
import TodoItem from './Todos/TodoItem'

@observer(['actions', 'state'])
class Todos extends Component {

    // When route is loaded (isomorphic)
    static fetchData({ actions, state, params }) {
        return actions.todos.browse().then(items => {
            state.todos.items = items
        })
    }

    render() {
        const { state } = this.props

        return <main>
            <h1>todos</h1>
            <div className="home">
                <TodoAdd/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map(item => (
                            <TodoItem key={item.text.hashCode()} item={item}/>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Todos
