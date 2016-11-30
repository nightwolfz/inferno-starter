import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../common/Loading'

@connect(['account'])
class Logout extends Component {

    // When route is loaded (isomorphic)
    static onEnter({ common }) {
        common.title = 'Logout'
    }

    state = {
        loading: false
    }

    handleLogout = () => {
        const { account } = this.props
        const { router } = this.context

        account.logout().then(() => {
            this.setState({
                loading: true
            })
            setTimeout(() => router.push('/'), 500)
        })
    }

    render() {
        const { loading } = this.state

        return <main>
            <center className="account">
                <h3>Do you want to log out ?</h3>
                <p>This will disconnect you and you will have to login again next time.</p>

                {loading
                    ? <Loading/>
                    : <button onClick={this.handleLogout}>Logout</button>
                }
            </center>
        </main>
    }
}

export default Logout
