import Inferno from 'inferno'
import { match } from 'universal-router'
import fetchData from './fetchData'
import routes from '../../src/client/routes'

let firstRender = !!process.env.BROWSER

export default async(stores, location) => {

    const renderProps = await match(routes(stores), location)

    if (process.env.BROWSER && firstRender) {
        firstRender = false
        return renderProps
    }
    return fetchData(renderProps, stores).then(() => {
        return renderProps
    })
}
