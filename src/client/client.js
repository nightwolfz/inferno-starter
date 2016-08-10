import '../shared/polyfills'
import '../shared/console'
import 'isomorphic-fetch'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import Context from './components/App/Context'
import history from '../shared/history'
import router from '../shared/router'
import routes from './routes'
import createState from './state'
import actions from './actions'

// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`

// Import our styles
if (process.env.BROWSER) {
    require('../assets/css/index.scss')
}

// Initialize stores and state
const state = createState(window.__STATE)
const context = {
    state,
    store: actions(state)
}

/**
 * Render our component acording to our routes
 * @param location
 */
function render(location) {
    function renderComponent(component) {
        return <Context router={history} context={context}>
            {component}
        </Context>
    }

    const params = {
        routes: routes(context),
        location: location.pathname
    }

    router(params, context).then(component => {
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
