// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/console'
import 'isomorphic-fetch'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import history from '../shared/history'
import router from '../shared/router'
import routes from './routes'
import { Provider } from 'mobx-inferno'
import { createClientState } from './state'
import actions from './actions'
import autorun from './autorun'
import App from './components/App/App'

// We render our react app into this element
const container = document.getElementById('container')

// Initialize actions and state
const stores = actions(window.__STATE)

// React to changes
autorun(stores)

const renderProps = (<App stores={stores}/>)

/**
 * Render our component acording to our routes
 * @param location
 */
function render(location) {
    router(routes, stores, location.pathname).then(component => {
        InfernoDOM.render(<Provider {...stores}>
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
}
