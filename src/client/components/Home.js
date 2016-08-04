import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
import size from 'lodash/fp'
import AddTodo from './Home/AddTodo'
import Todo from './Home/Todo'

@connect
class Home extends Component {

    // Server-side state being updated
    static fetchData({ store, state, params }) {
        return store.todos.browse().then(items => {
            state.todos.items = items
        })
    }

    componentDidMount() {
        const { store, state } = this.context

        if (!size(state.todos.items)) {
            store.todos.browse().then(items => {
                // Since the client-side state is observable, we have to use .replace() for arrays
                state.todos.items.replace(items)
            })
        }
    }

    render() {
        const { state } = this.context

        return <main>
            <h1>todos</h1>
            <div className="home">
                <AddTodo/>
                <section className="main">
                    <ul className="todo-list">
                        {state.todos.items.map(item => <Todo key={item.text.hashCode()} item={item}/>)}
                    </ul>
                </section>
            </div>
        </main>
    }
}

export default Home
