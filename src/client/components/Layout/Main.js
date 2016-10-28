import Inferno from 'inferno'
import Component from 'inferno-component'
import Header from './Header'

export default class Main extends Component {
    render({ children }) {
        return <div>
            <Header/>
            {children}
        </div>
    }
}
