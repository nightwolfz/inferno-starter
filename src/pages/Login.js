import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Error from '../components/common/Error'

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

    this.setState({
      error: null,
      loading: true
    })

    account.login({
        username,
        password
      })
      .then(() => router.push('/'))
      .catch(error => {
        this.setState({
          error,
          loading: false,
        })
      })
  }

  render() {
    const { loading, error } = this.state

    return <main>
      <h1>sign-in</h1>
      <form className="account" onSubmit={this.handleLogin}>
        <label>
          Username
          <input type="text"
                 name="username"
                 required
                 onInput={this.handleChange}
          />
        </label>

        <label>
          Password
          <input type="password"
                 name="password"
                 required
                 onInput={this.handleChange}
          />
        </label>

        {loading
          ? <button disabled>Loading</button>
          : <button type="submit">Login</button>
        }

        {error && <Error text={error}/>}
      </form>
    </main>
  }
}

export default Login
