import Inferno from 'inferno'
import App from './components/App/App'
import NotFound from './components/NotFound'
import Todos from './components/Todos'
import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'
import Register from './components/Account/Register'

/**
 * Wrap our content with the layout and provide params as props
 * @param context
 * @returns {Promise}
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
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {object}
 * @returns {object}
 */
export default function({ state }) {

    return [{
        path: '/',
        action: Layout,
        children: [
            { path: '/', action: () => Todos },
            { path: '/about', action: () => About },
            { path: '/login', action: () => Login },
            { path: '/logout', action: () => Logout },
            { path: '/register', action: () => Register }
        ]
    }]
}
