import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
import Loading from '../Common/Loading'

@connect
class Logout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const { account } = this.context.store
        const { state, router } = this.context

        account.logout().then(() => {
            this.setState({
                loading: false
            })
            setTimeout(() => router.push('/'), 200)
        })
    }

    render() {
        const { state } = this.context

        if (state.loading) {
            return <Loading/>
        }

        return <main>
            <center className="account">
                <h3>Signing out...</h3>
            </center>
        </main>
    }
}

export default Logout
