import { Component } from 'inferno'
import { Link } from 'inferno-router'

@connect('store')
class Menu extends Component {
  render({ store }) {
    return (
      <div>
        {store.account.isLoggedIn()
          ? <LoggedInMenu/>
          : <LoggedOutMenu/>}
      </div>
    )
  }
}

function LoggedInMenu() {
  return <menu>
    <Link to="/">Browse</Link>
    <Link to="/page/about">About</Link>
    <Link to="/page/logout">Logout</Link>
  </menu>
}

function LoggedOutMenu() {
  return <menu>
    <Link to="/">Browse</Link>
    <Link to="/page/about">About</Link>
    <Link to="/page/register">Register</Link>
    <Link to="/page/login">Login</Link>
  </menu>
}

export default Menu
