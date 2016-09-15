// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import '../shared/polyfills'
import '../shared/console'
import 'isomorphic-fetch'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import history from '../shared/history'
import router from '../shared/router'
import routes from './routes'
import { Provider } from 'mobx-inferno'
import { createClientState } from './state'
import actions from './actions'
import App from './components/App/App'

// Disable warnings from bluebird
Promise.config({
    warnings: false
})

// Initialize actions and state
const state = createClientState()
const context = {
    state,
    history,
    actions: actions(state)
}

// We render our react app into this element
const container = document.getElementById('inferno-root')

/**
 * Render our component acording to our routes
 * @param location
 */
function render(location) {
    router(routes, context, location.pathname).then(component => {
        InfernoDOM.render(<Provider {...context}>
            {component}
        </Provider>, container)
    })
}

// Listen for URL changes and render the correct component
render(history.getCurrentLocation());
history.listen(render);

// Use hot-reloading if available
if (module.hot) {
    module.hot.accept()
    //module.hot.decline('')
}
