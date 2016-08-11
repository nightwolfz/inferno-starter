import Inferno from 'inferno'
import isEmpty from 'lodash/fp/isEmpty'
import App from './components/App/App'
import NotFound from './components/NotFound'
import Todos from './components/Todos'
import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'
import Register from './components/Account/Register'

/**
 * Wrap our content with the layout and provide params as props
 * @param state
 * @returns {Function}
 * @constructor
 */
function Layout(context) {
    return context.next().then(Content => {
        return {
            component: <App><Content/></App>,
            params: context.params
        }
    })
}

/**
 * If not logged-in, show Login page
 * @param state
 * @returns {Function}
 */
function authorizedOnly(state) {
    return function(Route) {
        if (isEmpty(state.account)) {
            return () => Login
        }
        return () => Route
    }
}

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {object}
 * @returns {object}
 */
export default function({ state }) {
    const auth = authorizedOnly(state)

    return [{
        path: '/',
        action: Layout,
        children: [
            { path: '/', action: auth(Todos) },
            { path: '/about', action: () => About },
            { path: '/login', action: () => Login },
            { path: '/logout', action: () => Logout },
            { path: '/register', action: () => Register }
        ]
    }]
}
