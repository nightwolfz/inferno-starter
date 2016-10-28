import Inferno from 'inferno'
import Component from 'inferno-component'
import { Provider, connect } from 'inferno-mobx'
import { Link } from 'inferno-router'

export default class App extends Component {
    render({ stores, children }) {
        // "data-infernoroot" prop triggers hydration from server-side
        // if you don't use server-side rendering, remove this prop.
        return <div data-infernoroot>
            <Provider {...stores}>
                {children}
            </Provider>
        </div>
    }
}
