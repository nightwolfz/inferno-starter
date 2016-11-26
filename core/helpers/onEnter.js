/**
 * Go through the mached route and extract the static method
 * @param staticMethod {String}
 * @param components {Object}
 * @param promises {Array}
 * @returns {Object}
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
 * Execute onEnter methods of matched components
 * @returns {Promise}
 */
export default (routes, stores) => {
    if (!routes) throw new Error('A <Route> object must be provided')

    const promises = []
    const params = getRoutes('onEnter', routes.matched, promises)

    return Promise.all(promises.map(onEnter => onEnter({ ...stores, params})))
}
