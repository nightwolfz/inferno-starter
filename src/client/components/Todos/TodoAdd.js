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
            <p>
                <input type="text"
                       className="new-todo"
                       placeholder="What needs to be done?"
                       value={this.inputText}
                       onKeyUp={this.handleChange}
                />
            </p>
        </form>
    }
}

export default TodoAdd
