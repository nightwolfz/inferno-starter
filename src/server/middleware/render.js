import Inferno from 'inferno'
import InfernoServer from 'inferno-server'
import { Provider } from 'mobx-inferno'
import router from '../../shared/router';
import Html from '../../client/components/App/Html'
import routes from '../../client/routes'

/**
 * Server-side render
 * @param req
 * @param res
 */
export default function serverSideRender(req, res) {

    function sendResponse(statusCode, content) {
        res.status(statusCode).send('<!DOCTYPE html>\n' + content)
    }

    function renderComponent(component) {
        const context = req.context
        return (
            <Provider {...context}>
                <Html>{component}</Html>
            </Provider>
        )
    }

    router(routes, req.originalUrl, req.context).then(component => {
        sendResponse(200, InfernoServer.renderToString(renderComponent(component)))
    }).catch(error => {
        sendResponse(404, error.stack.replace(/\n/g, '<br>'))
    })
}
