import Inferno from 'inferno'
import Component from 'inferno-component'

export default class Html extends Component {
    render({ stores, children }) {
        const devServerURL = process.env.DEV ? `http://${stores.common.hostname.replace(/\d+/, 2002)}` : ''

        return <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{stores.common.title}</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
                <meta name="title" content={stores.common.title}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

                {/* Favicons */}
                <link rel="icon" href="/favicon.ico?v=ngg42qbKBN"/>

                {/* Build CSS */}
                <link href={devServerURL + '/build/bundle.css'} rel="stylesheet"/>

                {/* SSR State*/}
                <script dangerouslySetInnerHTML={insertState(stores)}/>
            </head>
            <body>
                {/* Our content rendered here */}
                <div id="container">
                    {children}
                </div>

                {/* Bundled JS */}
                <script src={devServerURL + '/build/bundle.js'}/>
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
