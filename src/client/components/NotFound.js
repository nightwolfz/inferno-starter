import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
//import { IndexLink } from 'inferno-router'

@connect
class NotFound extends Component {
    render() {
        const { history } = this.context

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={history.goBack}>Go back</a>
            <a href="/">Main menu</a>
        </main>
    }
}

export default NotFound;
