import Inferno from 'inferno'
import Component from 'inferno-component'
import { Provider } from 'inferno-mobx'
import Header from '../components/common/Header'

/**
 * Here you can define other providers
 * such as for redux
 */
export default class Index extends Component {
  render() {
    const { stores } = this.props

    return (
      <div>
        <Header/>
        <Provider {...stores}>
          {children}
        </Provider>
      </div>
    )
  }
}
