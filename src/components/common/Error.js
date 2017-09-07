import Inferno from 'inferno'

function Error(props) {
  return <p className="error-message">
    {props.text ? props.text : props.children}
  </p>
}

export default Error
