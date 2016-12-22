import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

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

        this.setState({
            loading: true
        })
        new Promise(resolve => setTimeout(resolve, 500))
            .then(() => account.logout())
            .then(() => router.push('/'))
    }

    render() {
        const { loading } = this.state

        return <main>
            <center className="account">
                <h3>Do you want to log out ?</h3>
                <p>This will disconnect you and you will have to login again next time.</p>

                {loading
                    ? <button disabled>Loading</button>
                    : <button onClick={this.handleLogout}>Logout</button>
                }
            </center>
        </main>
    }
}

export default Logout
