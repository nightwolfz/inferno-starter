import Inferno from 'inferno'
import Component from 'inferno-component'

/**
 * This component is rendered on the server side
 */
export default class Html extends Component {
    render({ stores, children, hostname, config }) {
        const serverURL = `//${hostname}`
        const bundleURL = process.env.DEV ? `${serverURL}:${config.http.port + 2}` : ''

        return <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{stores.common.title}</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
                <meta name="title" content={stores.common.title}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico?v=ngg42qbKBN"/>

                {/* SSR State*/}
                <script dangerouslySetInnerHTML={insertState(stores)}/>
            </head>
            <body>
                {/* Our content rendered here */}
                <div id="container">
                    {children}
                </div>

                {/* Build CSS */}
                <link href={`${bundleURL}/build/bundle.css`} rel="stylesheet"/>

                {/* Bundled JS */}
                <script src={`${bundleURL}/build/bundle.js`}/>
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
