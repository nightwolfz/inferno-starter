import { map } from 'lodash';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param context - contains our state and actions
 * @returns {Promise} - returns a promise
 */
export default async(components, params, stores) => {

    console.log(components)

    const accumulate = map(components.props.children, 'fetchData').filter(x => x)
    const fetchDataMethods = accumulate.map(method => method(stores, params))

    return Promise.all(fetchDataMethods);
}
