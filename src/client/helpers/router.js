import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import Router from 'universal-router'
import history from '../helpers/history'

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

export default ({ routes, location }) => {
    return Router.match(routes, location);
}
