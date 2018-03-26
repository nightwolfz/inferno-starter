import { Component } from 'inferno'
import { Route, Switch } from 'inferno-router'
import Menu from '../components/common/Menu'
import NotFound from '../pages/404'
import Todos from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'

/**
 * Here you can define other providers
 * such as for redux
 */
export default class Main extends Component {
  render() {
    return (
      <div>
        <Menu/>
        <Switch>
          <Route exact path="/" component={ Todos }/>
          <Route path="/page/about" component={ About }/>
          <Route path="/page/login" component={ Login }/>
          <Route path="/page/logout" component={ Logout }/>
          <Route path="/page/register" component={ Register }/>
          <Route path="*" component={ NotFound }/>
        </Switch>
      </div>
    )
  }
}
