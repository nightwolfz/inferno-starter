import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
import Loading from '../Common/Loading'

@connect
class Logout extends Component {

    componentDidMount() {
        const { account } = this.context.store
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
