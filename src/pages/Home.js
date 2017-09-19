import Inferno from 'inferno'
import Component from 'inferno-component'
import AddTodo from '../components/home/AddTodo'
import Todo from '../components/home/Todo'

@connect('state', 'store')
class Home extends Component {

  // When route is loaded (isomorphic)
  static async onEnter({ state, store }, params) {
    state.common.title = 'Home'
    await store.todos.browse()
  }

  render({ state }) {
    return (
      <main>
        <h1>todos</h1>
        <div className="home">
          <AddTodo/>
          <section className="main">
            <ul className="todo-list">
              {state.todos.map((item, index) => {
                return <Todo key={index} item={item}/>
              })}
            </ul>
          </section>
        </div>
      </main>
    )
  }
}

export default Home
