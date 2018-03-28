import { Component } from 'inferno'
import Loading from '../components/common/Loading'

@connect('store', 'state')
class Logout extends Component {

  // When route is loaded
  componentDidMount() {
    const { state } = this.props
    state.common.title = 'Logout'
  }

  state = {
    loading: false
  }

  handleLogout = async() => {
    const { store } = this.props
    const { router } = this.context

    this.setState({
      loading: true
    })

    // Simulate latency. Can be removed
    await new Promise(resolve => setTimeout(resolve, 500))

    store.account.logout()
    router.history.push('/')
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
