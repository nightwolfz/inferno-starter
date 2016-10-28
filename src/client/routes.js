import Inferno from 'inferno'
import { Route } from 'inferno-router'
import Main from './components/Layout/Main'
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

    function isAuthenticated(nextState, router) {
        if (!account.isLoggedIn()) {
            //router.push('/page/login')
        }
    }

    return (
        <Route component={ Main }>
            <Route path="/" component={ Todos } onEnter={ isAuthenticated }/>
            <Route path="/page/about" component={ About }/>
            <Route path="/page/login" component={ Login }/>
            <Route path="/page/logout" component={ Logout }/>
            <Route path="/page/register" component={ Register }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    )
}
