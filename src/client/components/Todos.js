import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import TodoAdd from './Todos/TodoAdd'
import TodoItem from './Todos/TodoItem'

@connect(['todos'])
class Todos extends Component {

    // When route is loaded (isomorphic)
    static onEnter({ todos, common, params }) {
        common.title = 'Home'
        return todos.browse()
    }

    render({ todos }) {
        return <main>
            <h1>todos</h1>
            <div className="home">
                <TodoAdd/>
                <section className="main">
                    <ul className="todo-list">
                        {todos.map(item => (
                            <TodoItem key={item.text.hashCode()} item={item}/>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Todos
