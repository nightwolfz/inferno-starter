import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'

class Loading extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.loading !== nextProps.loading;
    }

    render() {

        // When done loading, show wrapped components
        if (!this.props.loading) {
            const className = this.props.className || null
            return createElement(this.props.component || 'div', { className }, this.props.children)
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
