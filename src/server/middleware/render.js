import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { RouterContext, match } from 'inferno-router'
import config from '../config';
import onEnter from '../../../core/helpers/onEnter';
import routes from '../../client/routes'
import Html from '../../client/containers/Html'
import App from '../../client/containers/App'

// Server-side render
export default async(ctx, next) => {

    let content = null
    const routing = routes(ctx.stores)
    const renderProps = match(routing, ctx.url)

    function renderSSRComponent() {
        if (config.server.SSR) {
            return <Html stores={ctx.stores}>
                <App stores={ctx.stores}>
                    <RouterContext {...renderProps}/>
                </App>
            </Html>
        } else {
            return <Html stores={ctx.stores}/>
        }
    }

    try {
        await onEnter(renderProps, ctx.stores)
        content = renderToStaticMarkup(renderSSRComponent())

    } catch(error) {
        if (error.redirect) {
            ctx.redirect(error.redirect)
        } else {
            content = renderError(error)
        }
    }

    ctx.body = '<!DOCTYPE html>\n' + content
    await next()
}

function renderError(error) {
    console.error('renderError:', error)
    return (error.stack ? error.stack.replace(/\n/g, '<br>') : error.toString());
}
