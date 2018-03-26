import { Component } from 'inferno'
import { NavLink } from 'inferno-router'

@connect()
class NotFound extends Component {
  render() {
    return <main className="text-center">
      <p>&nbsp;</p>
      <h1>Page not found. Are you lost ?</h1>

      <NavLink to="/">Go to Homepage</NavLink>
    </main>
  }
}

export default NotFound
