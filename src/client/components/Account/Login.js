import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable } from 'mobx'
import { connect } from 'inferno-mobx'
import Loading from '../Common/Loading'
import Error from '../Common/Error'

@connect(['account'])
class Login extends Component {

    state = {
        username: '',
        password: '',
        loading: false,
        error: null
    }

    handleChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { account } = this.props
        const { history } = this.context
        const { username, password } = this.state

        account.login({ username, password })
            .then(() => {
                this.setState({
                    error: null,
                    loading: true
                })
                setTimeout(() => history.push('/'), 500)
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
                           value={this.state.username}
                           onKeyUp={this.handleChange('username')}
                           required="required"/>
                </label>

                <label>
                    Password
                    <input type="password"
                           value={this.state.password}
                           onKeyUp={this.handleChange('password')}
                           required="required"/>
                </label>

                {error && <Error text={error}/>}

                <button onClick={(e) => this.handleLogin(e)}>Login</button>
            </form>
        </main>
    }
}

export default Login
