import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../Common/Loading'

@connect(['account'])
class Logout extends Component {

    state = {
        loading: false
    }

    handleLogout = () => {
        const { account } = this.props
        const { history } = this.context

        account.logout().then(() => {
            this.setState({
                loading: true
            })
            setTimeout(() => history.push('/'), 500)
        })
    }

    render() {
        const { loading } = this.state

        if (loading) {
            return <Loading/>
        }

        return <main>
            <center className="account">
                <h3>Do you want to log out ?</h3>
                <p>This will disconnect you and you will have to login again next time.</p>

                <button onClick={this.handleLogout}>Logout</button>
            </center>
        </main>
    }
}

export default Logout
