import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable } from 'mobx'
import { observer } from 'mobx-inferno'

@observer(['action', 'state'])
class TodoAdd extends Component {

    @observable inputText = ''

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.action.todos.add(this.inputText)
            .then(() => {
                // Clear input text on sucess
                this.inputText = ''
            })
    }

    handleChange = (e) => {
        this.inputText = e.target.value
    }

    render() {
        const { action } = this.props
        const { item } = this.props

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
