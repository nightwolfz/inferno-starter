import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import { Router, getRoutes } from 'inferno-router'
import { serverRendering } from '../config';
import fetchData from '../../../core/helpers/fetchData';
import routes from '../../client/routes'
import Html from '../../client/containers/Html'
import App from '../../client/containers/App'

// Server-side render
export default async(ctx, next) => {

    const routing = routes(ctx.stores)
    const matched = getRoutes(routing, ctx.url)

    function renderComponent() {
        return renderToString(<Html stores={ctx.stores}>
            <App stores={ctx.stores}>
                <Router url={ctx.url} matched={matched}/>
            </App>
        </Html>)
    }

    try {
        await fetchData(matched, ctx.stores)
        ctx.body = '<!DOCTYPE html>\n' + renderComponent()
        await next()
    } catch(error) {
        ctx.body = '<!DOCTYPE html>\n' + renderError(error)
        await next()
    }
}

function renderError(error) {
    console.error(error)
    return (error.stack ? error.stack.replace(/\n/g, '<br>') : error.toString());
}
