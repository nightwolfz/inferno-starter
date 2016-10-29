import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../Common/Loading'
import Error from '../Common/Error'

@connect(['account'])
class Login extends Component {

    // When route is loaded (isomorphic)
    static onEnter({ common }) {
        common.title = 'Login'
    }

    state = {
        username: '',
        password: '',
        loading: false,
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { account } = this.props
        const { router } = this.context
        const { username, password } = this.state

        account.login({ username, password })
            .then(() => {
                this.setState({
                    error: null,
                    loading: true
                })
                setTimeout(() => router.push('/'), 500)
            })
            .catch(error => {
                this.setState({
                    error,
                    loading: false,
                    password: ''
                })
            })
    }

    render() {
        const { loading, error } = this.state

        if (loading) {
            return <Loading/>
        }

        return <main>
            <h1>sign-in</h1>
            <form className="account" onSubmit={(e) => this.handleLogin(e)}>
                <label>
                    Usernames
                    <input type="text"
                           name="username"
                           value={this.state.username}
                           onKeyUp={this.handleChange}
                           required="required"/>
                </label>

                <label>
                    Password
                    <input type="password"
                           name="password"
                           value={this.state.password}
                           onKeyUp={this.handleChange}
                           required="required"/>
                </label>

                {error && <Error text={error}/>}

                <button onClick={(e) => this.handleLogin(e)}>Login</button>
            </form>
        </main>
    }
}

export default Login
