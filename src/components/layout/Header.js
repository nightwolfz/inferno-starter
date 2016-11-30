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

const LoggedInMenu = (props) => {
    return <menu>
        <Link to="/">Browse</Link>
        <Link to="/page/about">About</Link>
        <Link to="/page/logout">Logout</Link>
    </menu>
}

const LoggedOutMenu = (props) => {
    return <menu>
        <Link to="/">Browse</Link>
        <Link to="/page/about">About</Link>
        <Link to="/page/register">Register</Link>
        <Link to="/page/login">Login</Link>
    </menu>
}
