import Inferno from 'inferno'
import Router from 'universal-router'
import fetchData from './fetchData'
import history from './history'

function onClick(e) {
    e.preventDefault()
    history.push({
        pathname: e.target.pathname,
        search: e.target.search
    });
}

export function Link(props) {
    return (
        <a href={props.to} onClick={onClick}>{props.children}</a>
    )
}

export default ({ routes, location }, context) => {
    return Router.match(routes, location)
                 .then(renderProps => fetchData(renderProps, context))
}
