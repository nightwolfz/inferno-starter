import map from 'lodash/fp/map';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param {Object} - contains our state and stores
 * @returns {Promise} - returns a promise
 */
export default ({ component, params }, { state, actions }) => {
    const components = map('fetchData')(component.children).filter(x => x)
    const fetchDataMethods = components.map(method => method({ state, actions, params }))

    return Promise.all(fetchDataMethods).then(() => component);
};
