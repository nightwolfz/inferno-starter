import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import { Link } from 'inferno-router'

@connect(['account'])
export default class Header extends Component {
    render({ account }) {
        return account.isLoggedIn() ? <LoggedInMenu/> : <LoggedOutMenu/>
    }
}

function LoggedInMenu() {
    return <menu>
        <Link to="/">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/logout">Logout</Link>
    </menu>
}

function LoggedOutMenu() {
    return <menu>
        <Link to="/">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </menu>
}
