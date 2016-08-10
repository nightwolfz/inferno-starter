import Inferno, { createVNode } from 'inferno'
import Component from 'inferno-component'

class Loading extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.loading !== nextProps.loading;
    }

    render() {
        const { loading, component, className, children } = this.props

        // When done loading, show wrapped components
        if (!loading) {
            return createVNode()
            .setTag(component || 'div')
            .setClassName(className)
            .setChildren(children)
        }

        // Still loading...
        return <main className="spinner-wrapper">
            <svg className="spinner"
                 width="65px"
                 height="65px"
                 viewBox="0 0 66 66"
                 xmlns="http://www.w3.org/2000/svg">
                <circle className="path"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30">
                </circle>
            </svg>
        </main>
    }
}

export default Loading
