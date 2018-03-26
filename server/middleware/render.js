import fs from 'fs'
import { resolve } from 'path'
//import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import { StaticRouter } from 'inferno-router'
import { Provider } from 'inferno-mobx'
// import onEnter from 'core/onEnter'
import Main from '../../src/components/Main'
import config from '../config'

const indexHTML = fs.readFileSync(resolve(__dirname, '../../src/assets/index.html'), 'utf8')

// Server-side render
export default async(ctx) => {

  //const renderProps = match(routes, ctx.url)
  const bundleURL = config.server.DEV ? `//localhost:2002` : ''

  // if (config.server.SSR) {
  //   try {
  //     await onEnter(renderProps, ctx.context)
  //   } catch(error) {
  //     throw error
  //   }
  // }

  const context = {}
  const components = config.server.SSR ? renderToString(
    <Provider {...ctx.context}>
      <StaticRouter location={ctx.url} context={context}>
        <Main/>
      </StaticRouter>
    </Provider>
  ) : ''

  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    return ctx.redirect(context.url)
  }

  ctx.body = indexHTML
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{title}', ctx.context.state.common.title)
    .replace('{state}', JSON.stringify(ctx.context.state, null, 2))
    .replace('{children}', components)
}
