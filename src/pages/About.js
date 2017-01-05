import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect
class About extends Component {

    // When route is loaded (isomorphic)
    static onEnter({ common }) {
        common.title = 'About'
    }

    render() {
        return <main>
            <h1>Inferno-starter</h1>
            <section className="account">
                <p>
                    <img alt="nightwolfz" src="https://avatars0.githubusercontent.com/u/805022?v=3&s=160"/>
                </p>
                <p>
                    Created for the javascript community. May your reign never end!
                </p>
                <p>
                    <a href="https://github.com/nightwolfz/inferno-starter" rel="noopener" target="_blank">
                        https://github.com/nightwolfz/inferno-starter
                    </a>
                </p>
            </section>
        </main>
    }
}

export default About
