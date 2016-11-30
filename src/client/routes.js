import Inferno from 'inferno'
import { Route } from 'inferno-router'
import Layout from '../components/layout/Layout'
import NotFound from '../components/layout/404'
import Todos from '../pages/Todos'
import About from '../pages/About'
import Login from '../components/account/Login'
import Logout from '../components/account/Logout'
import Register from '../components/account/Register'

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
        <Route component={ Layout }>
            <Route path="/" component={ Todos } onEnter={ isAuthenticated }/>
            <Route path="/page/about" component={ About }/>
            <Route path="/page/login" component={ Login }/>
            <Route path="/page/logout" component={ Logout }/>
            <Route path="/page/register" component={ Register }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    )
}
