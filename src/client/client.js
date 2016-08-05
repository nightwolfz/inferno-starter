import '../shared/polyfills'
import '../shared/console'
import 'isomorphic-fetch'
import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'
import { extendObservable } from 'mobx'
import Context from './components/Common/Context'
import history from './helpers/history'
import router from './helpers/router'
import routes from './routes'
import createState from './state'
import actions from './actions'

// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
if (process.env.BROWSER) {
    // Import our styles
    require('../assets/css/index.scss')
}

// Initialize stores & inject server-side state into front-end
const state = createState(window.__STATE)
const context = {
    state,
    store: actions(state)
}

function renderComponent(props) {
    return <Context router={history} context={context}>
        {props.component}
    </Context>
}

function render(location) {
    const routerParams = {
        routes: routes(context),
        location: location.pathname
    }
    router(routerParams).then(renderProps => {
        InfernoDOM.render(renderComponent(renderProps), document.getElementById('root'))
    }).catch(err => {throw new Error(err)})
}

render(history.getCurrentLocation()); // render the current URL
history.listen(render);

if (module.hot) {
    module.hot.accept(() => {
        render(history.getCurrentLocation())
    })
}
