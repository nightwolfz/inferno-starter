import { isObservableArray, isObservableMap } from 'mobx'

/**
 * Helper function that supports merging maps
 * @param target
 * @param source
 */
function mergeObservables(target, source) {
    Object.keys(target).forEach(key => {
        if (typeof target[key] === 'object') {
            if (isObservableMap(target[key])) return target[key].merge(source[key])
            if (isObservableArray(target[key])) return target[key].replace(source[key])
            target[key] = source[key]
        } else {
            target[key] = source[key]
        }
    })

    return window.__STATE = target
}

export default mergeObservables
