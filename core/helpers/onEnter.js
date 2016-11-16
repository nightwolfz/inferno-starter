/**
 * Go through the mached route and extract the static method
 * @param props
 * @param promises
 * @returns {*}
 */
function getRoutes(staticMethod, components, promises) {
    const routes = components instanceof Array ? components : [components];

    routes.forEach(({ props }) => {
        props.component[staticMethod] && promises.push(props.component[staticMethod])
        props.children && getRoutes(staticMethod, props.children, promises)
    })
    return routes[0].props.params
}


/**
 * Execute fetchData methods for each component
 * @param component {Object}
 * @param params {Object}
 * @param stores {Object}
 * @returns {Promise}
 */
export default (routes, stores) => {
    if (!routes) return Promise.resolve()

    const promises = []
    const params = getRoutes('onEnter', routes, promises)

    return Promise.all(promises.map(onEnter => onEnter({ ...stores, params})))
};
