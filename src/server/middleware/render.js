import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { RouterContext, match } from 'inferno-router'
import config from '../../config';
import onEnter from '../../../core/helpers/onEnter';
import routes from '../../client/routes'
import Html from '../../components/layout/Html'
import App from '../../components/App'

// Server-side render
export default async(ctx, next) => {

    const routing = routes(ctx.stores)
    const renderProps = match(routing, ctx.url)

    if (renderProps.redirect) {
        return ctx.redirect(renderProps.redirect)
    }

    function renderSSRComponent() {
        return <Html stores={ctx.stores} hostname={ctx.hostname} config={config}>
            {config.server.SSR &&
                <App stores={ctx.stores}>
                    <RouterContext {...renderProps}/>
                </App>
            }
        </Html>
    }

    try {
        await onEnter(renderProps, ctx.stores)
        ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(renderSSRComponent())
    } catch(error) {
        throw error
    }
}
