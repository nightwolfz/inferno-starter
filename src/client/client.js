// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import 'isomorphic-fetch'
import '../../core/helpers/polyfills'
import '../../core/helpers/logger'
import '../assets/css/index.scss'
import onEnter from '../../core/helpers/onEnter'
import Inferno from 'inferno'
import { Router, match } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory';
import autorun from './autorun'
import stores from './stores'
import routes from './routes'
import App from '../components/App'

// We render our react app into this element
const container = document.getElementById('container')
window.browserHistory = createBrowserHistory()
const routing = routes(stores)

// React to changes
autorun(stores)

// Fetch data on route change
window.browserHistory.listen(location => {
    onEnter(match(routing, location), stores)
})

/**
 * Render our component according to our routes
 */
Inferno.render(<App stores={stores}>
    <Router history={window.browserHistory}>
        {routing}
    </Router>
</App>, container)


if (process.env.NODE_ENV !== 'development') {
    /**
     * Cache assets if browser supports serviceworker
     */
    if ('serviceWorker' in navigator) {
        const sw = navigator.serviceWorker

        sw.register('/service.js').then(function() {
            console.debug('CDN Worker: registered')
        }).catch(function(err) {
            console.error('ServiceWorker:', err)
        })
        sw.ready.then(function(registration) {
            console.debug('Worker: ready')
        })
    }
}

/**
 * Enable hot reloading if available
 */
if (module.hot) {
    module.hot.accept()
    require('inferno-devtools')
}
