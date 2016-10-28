import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import { Router, getRoutes } from 'inferno-router'
import config from '../config';
import onEnter from '../../../core/helpers/onEnter';
import routes from '../../client/routes'
import Html from '../../client/containers/Html'
import App from '../../client/containers/App'

// Server-side render
export default async(ctx, next) => {

    const routing = routes(ctx.stores)
    const matched = getRoutes(routing, ctx.url)

    function serverSideRender(SSR) {
        return SSR ? (<App stores={ctx.stores}>
            <Router url={ctx.url} matched={matched}/>
        </App>) : null
    }

    function renderComponent() {
        return renderToString(<Html stores={ctx.stores}>
            {serverSideRender(config.server.SSR)}
        </Html>)
    }

    try {
        await onEnter(matched, ctx.stores)
        ctx.body = '<!DOCTYPE html>\n' + renderComponent()
        await next()
    } catch(error) {
        if (error.redirect) {
            ctx.redirect(error.redirect)
        } else {
            ctx.body = '<!DOCTYPE html>\n' + renderError(error)
            await next()
        }
    }
}

function renderError(error) {
    console.error('renderError:', error)
    return (error.stack ? error.stack.replace(/\n/g, '<br>') : error.toString());
}
