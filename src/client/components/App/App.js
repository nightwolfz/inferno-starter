import Inferno from 'inferno'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'
import Link from '../Common/Link'
import Menu from '../Common/Menu'

@observer(['action', 'state'])
class App extends Component {
    render() {
        const { account } = this.props.action
        return <div>
            {account.isLoggedIn() ? <LoggedInMenu/> : <LoggedOutMenu/>}
            {this.props.children}
        </div>
    }
}

function LoggedInMenu() {
    return <Menu>
        <Link to="/">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/logout">Logout</Link>
    </Menu>
}

function LoggedOutMenu() {
    return <Menu>
        <Link to="/">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </Menu>
}

export default App
