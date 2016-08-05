import Inferno from 'inferno'
import InfernoServer from 'inferno-server'
import { getAccount } from '../actions/account';
import fetchData from '../helpers/fetchData';
import router from '../../client/helpers/router';
import Context from '../../client/components/Common/Context'
import Html from '../../client/components/Common/Html'
import createState from '../../client/state'
import routes from '../../client/routes'
import actions from '../../client/actions'

async function render(req, res) {

    // Add state & session data
    const state = createState()
    state.app.hostname = req.headers.host

    // Check if logged in
    const account = await getAccount(req.session)
    if (account) state.account = account

    const context = {
        state,
        store: actions(state)
    }

    // Create routing
    const matchRoutes = {
        routes,
        location: req.originalUrl
    }

    function sendResponse(statusCode, content) {
        res.status(statusCode).send('<!DOCTYPE html>\n' + content)
    }

    function renderComponent({ component }) {
        return (
            <Context context={context}>
                <Html>{component}</Html>
            </Context>
        )
    }

    router(matchRoutes).then(renderProps => {
        const content = InfernoServer.renderToString(renderComponent(renderProps))
        sendResponse(200, content)
    }).catch(error => {
        sendResponse(404, error)
    })
}

export default render
