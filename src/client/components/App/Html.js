import Inferno from 'inferno'
import Component from 'inferno-component'
import { observer } from 'mobx-inferno'

@observer(['actions', 'state'])
class Html extends Component {

    render() {
        const { state } = this.props
        const devServerURL = process.env.NODE_ENV === 'production' ? '' : `http://${state.app.hostname.replace(2000, 2002)}`

        return <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{state.app.title}</title>
                <meta name="title" content={state.app.title}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

                {/* Favicons */}
                <link rel="icon" href="/favicon.ico"/>

                {/* Bundled assets */}
                <link href={devServerURL + '/build/bundle.css'} rel="stylesheet"/>
                <script dangerouslySetInnerHTML={insertState(state)}/>
            </head>
            <body>
                {/* Our content rendered here */}
                <div id="inferno-root">
                    {this.props.children}
                </div>
                <script src={devServerURL + '/build/bundle.js'}/>
            </body>
        </html>
    }
}

function insertState(state) {
    return {
        __html: 'window.__STATE = ' + JSON.stringify(state) + ';'
    }
}

export default Html
