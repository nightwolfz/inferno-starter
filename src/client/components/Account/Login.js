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
        console.log({
            [e.target.name]: e.target.value
        })
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

        return <main>
            <h1>sign-in</h1>
            <form className="account" onSubmit={(e) => this.handleLogin(e)}>
                <label>
                    Username
                    <input type="text"
                           name="username"
                           onKeyUp={this.handleChange}
                    />
                </label>

                <label>
                    Password
                    <input type="password"
                           name="password"
                           onKeyUp={this.handleChange}/>
                </label>

                {error && <Error text={error}/>}

                {loading
                    ? <Loading/>
                    : <button onClick={(e) => this.handleLogin(e)}>Login</button>
                }
            </form>
        </main>
    }
}

export default Login
