import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable } from 'mobx'
import { connect } from 'mobx-connect/inferno'
import Error from '../Common/Error'

@connect
class Register extends Component {

    @observable form = {
        username: '',
        password: '',
        errorMsg: null
    }

    handleChange = (key) => (e) => {
        this.form[key] = e.target.value
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.handleRegister()
    }

    handleRegister() {
        const { account } = this.context.store
        const { router } = this.context
        const { username, password } = this.form

        account.register({ username, password })
            .then(() => {
                account.login({ username, password }).then(() => {
                    router.push('/')
                })
            })
            .catch(error => this.form.errorMsg = error)
    }

    render() {
        return <main>
            <h1>register</h1>
            <form className="account" onSubmit={e => this.handleSubmit(e)}>
                <label>
                    Username
                    <input type="text"
                           value={this.form.username}
                           onKeyDown={this.handleChange("username")} required="required"/>
                </label>

                <label>
                    Password
                    <input type="password"
                           value={this.form.password}
                           onKeyDown={this.handleChange("password")} required="required"/>
                </label>

                {this.form.errorMsg && <Error text={this.form.errorMsg}/>}

                <button>Register</button>
            </form>
        </main>
    }
}

export default Register
