import Inferno from 'inferno'
import Component from 'inferno-component'
import { observable, action } from 'mobx'
import { connect } from 'inferno-mobx'
import Error from '../components/common/Error'

@connect(['account'])
class Register extends Component {

  // When route is loaded (isomorphic)
  static onEnter({ common }) {
    common.title = 'Register'
  }

  @observable form = {
    username: '',
    password: '',
    errorMsg: null,
    loading: false
  }

  handleChange = (key) => (e) => {
    this.form[key] = e.target.value
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleRegister()
  }

  @action
  handleRegister() {
    const { account } = this.props
    const form = this.form
    const { username, password } = form
    const { router } = this.context

    form.errorMsg = null
    form.loading = true

    account.register({
        username,
        password
      })
      .then(() => account.login({
        username,
        password
      }))
      .then(() => router.push('/'))
      .catch(action(error => {
        form.errorMsg = error
        form.loading = false
      }))
  }

  render() {
    const form = this.form
    return <main>
      <h1>register</h1>
      <form className="account" onSubmit={this.handleSubmit}>
        <label>
          Username
          <input type="text"
                 required
                 onInput={this.handleChange('username')}
                 value={form.username}
          />
        </label>

        <label>
          Password
          <input type="password"
                 required
                 onInput={this.handleChange('password')}
                 autocomplete="new-password"
                 value={form.password}
          />
        </label>

        {form.loading
          ? <button disabled>Loading</button>
          : <button type="submit">Register</button>
        }

        {form.errorMsg && <Error text={form.errorMsg}/>}
      </form>
    </main>
  }
}

export default Register
