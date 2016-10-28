import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import { Link } from 'inferno-router'

@connect
class NotFound extends Component {
    render() {
        return <main className="text-center">
            <p>&nbsp;</p>
            <h1>Page not found. Are you lost ?</h1>

            <Link to="/">Go to Homepage</Link>
        </main>
    }
}

export default NotFound;
