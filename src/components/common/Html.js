import Inferno from 'inferno'
import Component from 'inferno-component'
import { readFileSync } from 'jsonfile'

/**
 * This component is rendered on the server side
 */
export default class Html extends Component {
  render({ stores, children, hostname, config }) {
    const serverURL = `//${hostname}`
    const bundleURL = process.env.DEV ? `${serverURL}:${config.http.port + 2}` : ''
    const manifest = process.env.DEV ? '' : readFileSync(`${__dirname}/../../../build/build-manifest.json`)

    return <html>
    <head>
      <meta charSet="utf-8"/>
      <title>{stores.common.title}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="title" content={stores.common.title}/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <meta name="theme-color" content="#ffffff"/>

      {/* Favicon & manifest */}
      <link rel="icon" href="/favicon.ico?v=ngg42qbKBN"/>
      <link rel="manifest" href="/manifest.json" defer="defer"/>

      {/* SSR State*/}
      <script dangerouslySetInnerHTML={insertState(stores)}/>

      {/* Build CSS */}
      <link href={`${bundleURL}/build/${process.env.DEV ? 'bundle.css' : manifest['bundle.css']}`} rel="stylesheet"/>
    </head>
    <body>
    {/* Our content rendered here */}
    <div id="container">
      {children}
    </div>

    {/* Bundled JS */}
    <script src={`${bundleURL}/build/${process.env.DEV ? 'bundle.js' : manifest['bundle.js']}`}/>
    </body>
    </html>
  }
}

function insertState(stores) {
  return {
    __html: 'window.__STATE = ' + safeStringify(stores) + ';'
  }
}

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj, null, process.env.DEV ? 4 : 0)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
