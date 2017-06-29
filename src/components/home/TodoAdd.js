import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable } from 'mobx'
import { connect } from 'inferno-mobx'

@connect(['todos'])
class TodoAdd extends Component {

    @observable inputText = ''

    handleSubmit = (e) => {
        e.preventDefault()
        const { todos } = this.props
        todos.add(this.inputText).then(() => {
            // Clear input text on sucess
            this.inputText = ''
        })
    }

    handleChange = (e) => {
        this.inputText = e.target.value
    }

    render() {
        return <form className="header" onSubmit={this.handleSubmit}>
            <label>
                <input type="text"
                       className="new-todo"
                       placeholder="What needs to be done?"
                       onKeyUp={this.handleChange}
                />
            </label>
        </form>
    }
}

export default TodoAdd
