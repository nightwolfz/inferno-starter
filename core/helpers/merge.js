import { isObservableArray, isObservableMap, extendObservable } from 'mobx'

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
            extendObservable(target[key], source[key])
        } else {
            target[key] = source[key]
        }
    })
    window.__STATE = target

    return target
}

export default mergeObservables
