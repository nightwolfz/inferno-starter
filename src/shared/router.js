import Inferno from 'inferno'
import { match } from 'universal-router'
import fetchData from './fetchData'
import history from './history'

let firstRender = !!process.env.BROWSER

export default (routes, location, context) => {
    return match(routes(context), location).then(renderProps => {
        context.router = history
        if (process.env.BROWSER && firstRender) {
            firstRender = false
            return renderProps.component
        }
        return fetchData(renderProps, context).then(() => renderProps.component)
    })
}
