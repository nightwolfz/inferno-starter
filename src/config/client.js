// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/globals'
import 'core/logger'
import { render } from 'inferno'
import { BrowserRouter } from 'inferno-router'
import { Provider } from 'inferno-mobx'
import autorun from './autorun'
import createContext from './context'
import State from '../stores/State'
import Main from '../components/Main'

if (process.env.NODE_ENV !== 'production') {
  require('inferno-devtools')
  require('mobx-logger').enableLogging({
    action: true,
    reaction: false,
    transaction: true,
    compute: false
  })
}

const context = createContext(new State(window.__STATE))

// React to changes
autorun(context)

// Render our component according to our routes
function renderApp() {
  render(<Provider {...context}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>, document.getElementById('container'))
}

renderApp()

// Enable hot reloading if available
if (module.hot) {
  module.hot.accept(renderApp)
}
