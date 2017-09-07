import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../components/common/Loading'

@connect(['store'])
class Logout extends Component {

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Logout'
  }

  state = {
    loading: false
  }

  handleLogout = () => {
    const { store } = this.props
    const { router } = this.context

    this.setState({
      loading: true
    })
    new Promise(resolve => setTimeout(resolve, 500))
      .then(() => store.account.logout())
      .then(() => router.push('/'))
  }

  render(_, { loading }) {
    return <main>
      <div className="account">
        <h3>Do you want to log out ?</h3>
        <p>This will disconnect you and you will have to login again next time.</p>

        {loading
          ? <Loading/>
          : <button onClick={this.handleLogout}>Logout</button>
        }
      </div>
    </main>
  }
}

export default Logout
