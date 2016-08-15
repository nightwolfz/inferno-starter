import Inferno from 'inferno'
import classnames from 'classnames'
import isEmpty from 'lodash/fp/isEmpty'
import history from '../../../shared/history'

function pushHistory(e, props) {
    e.preventDefault()
    props.onClick && props.onClick()
    history.push({
        pathname: props.to,
        search: e.target.search
    })
}

export default function Link(props) {
    return (
    <a href={props.to}
       className={props.className}
       onClick={e => pushHistory(e, props)}>
        {props.children}
    </a>
    )
}
