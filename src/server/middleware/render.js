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

    let content = null
    const routing = routes(ctx.stores)
    const renderProps = match(routing, ctx.url)

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
        content = renderToStaticMarkup(renderSSRComponent())

    } catch(error) {
        if (error.redirect) {
            return ctx.redirect(error.redirect)
        }
        throw error
    }

    ctx.body = '<!DOCTYPE html>\n' + content
}
