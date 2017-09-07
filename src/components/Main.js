import Inferno from 'inferno'
import Component from 'inferno-component'
import Menu from '../components/common/Menu'

/**
 * Here you can define other providers
 * such as for redux
 */
export default class Main extends Component {
  render({ children }) {
    return (
      <div>
        <Menu/>
        {children}
      </div>
    )
  }
}
