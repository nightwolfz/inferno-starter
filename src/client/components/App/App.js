import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'
import { Link } from '../../../shared/router'
import Menu from '../Common/Menu'

@connect
class App extends Component {
    render() {
        const { account } = this.context.store
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
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </Menu>
}

export default App
