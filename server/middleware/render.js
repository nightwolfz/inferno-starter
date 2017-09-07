import fs from 'fs'
import { resolve } from 'path'
import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { RouterContext, match } from 'inferno-router'
import { Provider } from 'inferno-mobx'
import onEnter from 'core/onEnter'
import Main from '../../src/components/Main'
import config from '../config'
import routes from '../../src/config/routes'

const indexHTML = fs.readFileSync(resolve(__dirname, '../../src/pages/index.html'), 'utf8')

// Server-side render
export default async(ctx) => {

  const renderProps = match(routes, ctx.url)
  const bundleURL = config.server.DEV ? `//localhost:2002` : ''

  if (renderProps.redirect) {
    return ctx.redirect(renderProps.redirect)
  }

  try {
    await onEnter(renderProps, ctx.context)
  } catch(error) {
    throw error
  }

  const components = renderToStaticMarkup(
    <Provider {...ctx.context}>
      <RouterContext
        matched={renderProps.matched}
        location={renderProps.location}
      />
    </Provider>
  )

  ctx.body = indexHTML
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{title}', ctx.context.state.common.title)
    .replace('{state}', JSON.stringify(ctx.context.state, null, 2))
    .replace('{children}', components)
}
