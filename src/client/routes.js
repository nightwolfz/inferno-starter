import Inferno from 'inferno'
import App from './components/App'
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'
import Register from './components/Account/Register'

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
export default function({ state }) {

    function Layout(Content) {
        return <App><Content/></App>
    }

    return [{
        path: '/',
        action(context) {
            return context.next().then(Layout)
        },
        children: [{
            path: '/',
            action: () => Home
        }, {
            path: '/about',
            action: () => About
        }, {
            path: '/login',
            action: () => Login
        }, {
            path: '/logout',
            action: () => Logout
        }, {
            path: '/register',
            action: () => Register
        }]
    }]
}
/*
export default (
    <Router history={history} component={App} hashbang="true">
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
        <Route path="/about" component={About}/>
        <Route path="/" component={Home}/>
        <Route path="*" component={NotFound}/>
    </Router>
);*/
