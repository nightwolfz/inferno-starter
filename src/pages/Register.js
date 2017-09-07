import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Error from '../components/common/Error'

@connect(['state', 'store'])
class Register extends Component {

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Register'
  }

  state = {
    username: '',
    password: '',
    errorMsg: null,
    loading: false
  }

  handleChange = (key) => (e) => {
    this.setState({ [key]: e.target.value })
  }

  handleSubmit = async(e) => {
    e.preventDefault()
    await this.handleRegister()
  }

  handleRegister = async() => {
    const { router } = this.context
    const { store } = this.props
    const { username, password } = this.state

    this.setState({
      loading: true,
      errorMsg: null
    })

    try {
      await store.account.register({
        username,
        password
      })
      router.push('/')
    } catch(error) {
      this.setState({
        loading: false,
        errorMsg: error.toString()
      })
    }
  }

  render() {
    const { username, password, loading, errorMsg } = this.state
    return <main>
      <h1>register</h1>
      <form className="account" onSubmit={this.handleSubmit}>
        <label>
          Username
          <input type="text"
                 required
                 onInput={this.handleChange('username')}
                 value={username}
          />
        </label>

        <label>
          Password
          <input type="password"
                 required
                 onInput={this.handleChange('password')}
                 autoComplete="new-password"
                 value={password}
          />
        </label>

        {loading
          ? <button disabled>Loading</button>
          : <button type="submit">Register</button>
        }

        {errorMsg && <Error text={errorMsg}/>}
      </form>
    </main>
  }
}

export default Register
