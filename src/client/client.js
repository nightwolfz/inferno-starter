// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import 'isomorphic-fetch'
import '../../core/polyfills'
import '../../core/logger'
import '../assets/css/index.scss'
import onEnter from '../../core/helpers/onEnter'
import Inferno from 'inferno'
import { Router, getRoutes } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory';
import autorun from './autorun'
import stores from './stores'
import routes from './routes'
import App from './containers/App'

// We render our react app into this element
const container = document.getElementById('container')
const history = createBrowserHistory()

// React to changes
autorun(stores)

/**
 * Render our component according to our routes
 * @param location
 */
function renderDOM(location) {
    const routing = routes(stores)
    const matched = getRoutes(routing, location.pathname, '')

    onEnter(matched, stores).then(() => {
        Inferno.render(<App stores={stores}>
            <Router history={history} matched={matched}/>
        </App>, container)
    })
}

// Render HTML on the browser
renderDOM(history.location)
history.listen(renderDOM)

if (module.hot) {
    module.hot.accept()
}
