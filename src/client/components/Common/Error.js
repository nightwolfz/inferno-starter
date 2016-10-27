import Inferno from 'inferno'

export default function Error(props) {
    return <p className="error-message">
        { props.text ? props.text : props.children }
    </p>
}
