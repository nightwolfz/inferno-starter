import Inferno from 'inferno'
import { Route, IndexRoute } from 'inferno-router'
import Index from '../pages/Index'
import NotFound from '../pages/404'
import Todos from '../pages/Todos'
import About from '../pages/About'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'

/**
 * Routes are defined here.
 * @param {object} - stores
 * @returns {object}
 */
export default (
  <Route component={ Index }>
    <IndexRoute component={ Todos }/>
    <Route path="/page/about" component={ About }/>
    <Route path="/page/login" component={ Login }/>
    <Route path="/page/logout" component={ Logout }/>
    <Route path="/page/register" component={ Register }/>
    <Route path="*" component={ NotFound }/>
  </Route>
)
