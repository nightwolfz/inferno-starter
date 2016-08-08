import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param {Object} - contains our state and stores
 * @returns {Promise} - returns a promise
 */
export default ({ component, params }, { state, store }) => {
    const components = map('fetchData')(component.children).filter(x => x)
    const fetchDataMethods = components.map(method => method({ state, store, params }))

    return Promise.all(fetchDataMethods).then(() => component);
};
