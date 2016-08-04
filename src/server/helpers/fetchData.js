import compose from 'lodash/fp/compose';
import compact from 'lodash/fp/compact';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';

/**
 * Execute fetchData methods for each component
 * @param renderProps
 * @param state - contains our state
 * @param store - contains our actions
 * @returns {Promise} - returns a promise
 */
export default (renderProps, state, store) => {
    const params = renderProps.params
    const fetchDataMethods = compose(
        map('fetchData'),
        filter('fetchData'),
        compact
    )(renderProps.components)

    return Promise.all(fetchDataMethods.map(method => method({ state, store, params })));
};
