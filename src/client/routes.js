import Inferno from 'inferno'
import { Route } from 'inferno-router'
import isEmpty from 'lodash/fp/isEmpty'
import Main from './containers/Main'
import NotFound from './containers/NotFound'
import Todos from './components/Todos'
import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'
import Register from './components/Account/Register'

/**
 * Routes are defined here.
 * @param {object} - stores
 * @returns {object}
 */
export default function({ account }) {
    return (
    <Route component={ Main }>
        <Route path="/" component={ Todos }/>
        <Route path="/about" component={ About }/>
        <Route path="/login" component={ Login }/>
        <Route path="/logout" component={ Logout }/>
        <Route path="/register" component={ Register }/>
        <Route path="*" component={ NotFound }/>
    </Route>
    )
}
