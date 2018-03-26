import { Component } from 'inferno'
import { observable } from 'mobx'

@connect('store')
class AddTodo extends Component {

  @observable inputText = ''

  handleSubmit = async(e) => {
    e.preventDefault()
    const { store } = this.props
    await store.todos.add(this.inputText)
    this.inputText = ''
  }

  handleChange = (e) => {
    this.inputText = e.target.value
  }

  render() {
    return (
      <form className="header" onSubmit={this.handleSubmit}>
        <p>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.inputText}
            onChange={this.handleChange}
          />
        </p>
      </form>
    )
  }
}

export default AddTodo
