import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import Loading from '../Common/Loading'

@connect(['account'])
class Logout extends Component {

    componentDidMount() {
        const { account } = this.props
        account.logout()
    }

    render() {
        return <main>
            <center className="account">
                <h3>Signing out...</h3>
            </center>
        </main>
    }
}

export default Logout
