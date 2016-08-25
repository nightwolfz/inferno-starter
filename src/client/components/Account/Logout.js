import Inferno from 'inferno'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'
import Loading from '../Common/Loading'

@observer(['action', 'state'])
class Logout extends Component {

    componentDidMount() {
        const { account } = this.props.action
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
