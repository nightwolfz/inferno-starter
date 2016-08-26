import Inferno from 'inferno'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'
//import { IndexLink } from 'inferno-router'

@observer(['actions', 'state', 'history'])
class NotFound extends Component {
    render() {
        const { history } = this.props

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={history.goBack}>Go back</a>
            <a href="/">Main menu</a>
        </main>
    }
}

export default NotFound;
