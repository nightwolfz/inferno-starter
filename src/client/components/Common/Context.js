import Inferno from 'inferno'
import Component from 'inferno-component'
import { contextTypes } from 'mobx-connect/inferno'

/**
 * Top level component that wraps everything (router, i18n, app)
 * providing an entry point for the store and state references
 * @class Context
 * @returns {Object}
 */
class Context extends Component {
    getChildContext() {
        return {
            ...this.props.context,
            router: this.props.router
        }
    }
    render() {
        return this.props.children
    }
}

Context.childContextTypes = contextTypes;

export default Context
