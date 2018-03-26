import { Component } from 'inferno'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

@connect('state', 'store')
class Login extends Component {

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Login'
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null
    }
  }

  handleChange = (e) => {
    console.warn({
      [e.target.name]: e.target.value
    })
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { store } = this.props
    const { router } = this.context
    const { username, password } = this.state

    this.setState({
      error: null,
      loading: true
    })

    store.account.login({ username, password }).then(() => {
      router.push('/')
    }).catch(error => {
      this.setState({
        error,
        loading: false,
      })
    })
  }

  render() {
    const { loading, error, username } = this.state

    if (loading) {
      return <Loading/>
    }

    return (
      <main>
        <h1>sign-in</h1>
        <form className="account" onSubmit={this.handleLogin}>
          <label>
            Usernames
            <input
              type="text"
              name="username"
              onInput={this.handleChange}
              value={username}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              onInput={this.handleChange}
              required
            />
          </label>

          {loading
            ? <button disabled>Loading</button>
            : <button type="submit">Login</button>
          }

          {error && <Error text={error}/>}
        </form>
      </main>
    )
  }
}

export default Login
