import { Component } from 'inferno'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

@connect('state', 'store')
class Login extends Component {

  // When route is loaded
  componentDidMount() {
    const { state } = this.props
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
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async(e) => {
    e.preventDefault()
    const { store } = this.props
    const { router } = this.context
    const { username, password } = this.state

    this.setState({
      error: null,
      loading: true
    })

    try {
      // Simulate latency. Can be removed
      await new Promise(resolve => setTimeout(resolve, 500))

      await store.account.login({ username, password })
      router.history.push('/')
    } catch(error) {
      this.setState({
        error,
        loading: false,
      })
    }
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
