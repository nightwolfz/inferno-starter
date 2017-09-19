// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/globals'
import 'core/logger'
import onEnter from 'core/onEnter'
import Inferno from 'inferno'
import { Router, match } from 'inferno-router'
import { Provider } from 'inferno-mobx'
import createBrowserHistory from 'history/createBrowserHistory';
import autorun from './autorun'
import createContext from './context'
import State from '../stores/State'
import routes from './routes'

if (process.env.NODE_ENV !== 'production') {
  require('inferno-devtools')
  require('mobx-logger').enableLogging({
    action: true,
    reaction: false,
    transaction: true,
    compute: false
  })
} else {
  require('./sw')
}

const context = createContext(new State(window.__STATE))
const history = createBrowserHistory()

// React to changes
autorun(context)

// Fetch data on route change
history.listen(location => {
  onEnter(match(routes, location), context)
})

// Render our component according to our routes
function renderApp() {
  Inferno.render(<Provider {...context}>
    <Router history={history} url={history.location.pathname}>
      {routes}
    </Router>
  </Provider>, document.getElementById('container'))
}

renderApp()

// Enable hot reloading if available
if (module.hot) {
  module.hot.accept(renderApp)
}
