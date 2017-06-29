import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { RouterContext, match } from 'inferno-router'
import onEnter from 'core/onEnter'
import routes from '../../src/client/routes'
import Html from '../../src/components/common/Html'
import Index from '../../src/pages/Index'

// Server-side render
export default async(ctx) => {

  const renderProps = match(routes, ctx.url)

  if (renderProps.redirect) {
    return ctx.redirect(renderProps.redirect)
  }

  function renderSSRComponent() {
    return (
      <Html stores={ctx.stores} hostname={ctx.hostname} config={config}>
        {config.server.SSR && (
          <Index stores={ctx.stores}>
            <RouterContext {...renderProps}/>
          </Index>
        )}
      </Html>
    )
  }

  try {
    await onEnter(renderProps, ctx.stores)
    ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(renderSSRComponent())
  } catch(error) {
    throw error
  }
}
