import _ from 'underscore';

/**
 * Go through the mached route and extract fetchData method
 * @param props
 * @param promises
 * @returns {*}
 */
function getRoutes(staticMethod, { props }, promises) {
    props.component[staticMethod] && promises.push(props.component[staticMethod])
    props.children && getRoutes(staticMethod, props.children, promises)
    return props.params
}


/**
 * Execute fetchData methods for each component
 * @param component {Object}
 * @param params {Object}
 * @param stores {Object}
 * @returns {Promise}
 */
export default (routes, stores) => {
    const promises = []
    const params = getRoutes('fetchData', routes, promises)

    return Promise.all(promises.map(fetchData => fetchData({ ...stores, params})))
};
