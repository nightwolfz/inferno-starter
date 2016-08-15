// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../shared/polyfills'
import '../shared/console'
import 'isomorphic-fetch'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import Context from './components/App/Context'
import history from '../shared/history'
import router from '../shared/router'
import routes from './routes'
import { createClientState } from './state'
import actions from './actions'

// Disable warnings from bluebird
Promise.config({
    warnings: false
})

// Import our styles
if (process.env.BROWSER) {
    require('../assets/css/index.scss')
}

// Initialize actions and state
const state = createClientState()
const context = {
    state,
    history: history,
    action: actions(state)
}

/**
 * Render our component acording to our routes
 * @param location
 */
function render(location) {
    function renderComponent(component) {
        return <Context context={context}>
            {component}
        </Context>
    }

    router(routes, location.pathname, context).then(component => {
        InfernoDOM.render(renderComponent(component), document.getElementById('inferno-root'))
    })
}

// Listen for URL changes and render the correct component
render(history.getCurrentLocation());
history.listen(render);

// Use hot-reloading if available
if (module.hot) {
    module.hot.accept(() => {
        render(history.getCurrentLocation())
    })
}
