import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import TodoAdd from '../components/home/TodoAdd'
import TodoItem from '../components/home/TodoItem'

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
          <TodoItemWrapper todos={todos}/>
        </section>
      </div>
    </main>
  }
}

// Render each item
const TodoItemWrapper = connect(props => (
  <ul className="todo-list">
    {props.todos.map(item => <TodoItem item={item}/>)}
  </ul>
))

export default Todos
