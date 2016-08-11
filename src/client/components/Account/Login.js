import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable } from 'mobx'
import { connect } from 'mobx-connect/inferno'
import Loading from '../Common/Loading'
import Error from '../Common/Error'

@connect
class Login extends Component {

    @observable form = {
        username: '',
        password: '',
        loading: false,
        error: null
    }

    handleChange = (key) => (e) => {
        this.form[key] = e.target.value
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { account } = this.context.store
        const { router } = this.context

        account.login({
                username: this.form.username,
                password: this.form.password
            })
            .then(() => {
                this.form.error = null
                this.form.loading = true
                setTimeout(() => router.push('/'), 500)
            })
            .catch(error => {
                this.form.error = error
                this.form.loading = false
                this.form.password = ''
            })
    }

    render() {
        const { form } = this

        if (form.loading) {
            return <Loading/>
        }

        return <main>
            <h1>sign-in</h1>
            <form className="account" onSubmit={e => this.handleLogin(e)}>
                <label>
                    Username
                    <input type="text"
                           value={this.form.username}
                           onKeyUp={this.handleChange('username')}
                           required="required"/>
                </label>

                <label>
                    Password
                    <input type="password"
                           value={this.form.password}
                           onKeyUp={this.handleChange('password')}
                           required="required"/>
                </label>

                {form.error && <Error text={form.error}/>}

                <button onClick={e => this.handleLogin(e)}>Login</button>
            </form>
        </main>
    }
}

export default Login
