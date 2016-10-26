import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../Common/Loading'

@connect(['account'])
class Logout extends Component {

    handleLogout = () => {
        const { account } = this.props
        const { history } = this.context

        account.logout().then(() => {
            setTimeout(() => history.push('/'), 500)
        })
    }

    render() {
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
