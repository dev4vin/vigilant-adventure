"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepExtend = exports.DeepCopy = void 0;
/**
 * Returns a deep copy of an object or array.
 *
 * @param {object|array} value The object or array to deep copy.
 * @return {object|array} A deep copy of the provided object or array.
 */
function DeepCopy(value) {
    return DeepExtend(undefined, value);
}
exports.DeepCopy = DeepCopy;
/**
 * Copies properties from source to target (recursively allows extension of objects and arrays).
 * Scalar values in the target are over-written. If target is undefined, an object of the
 * appropriate type will be created (and returned).
 *
 * We recursively copy all child properties of plain objects in the source - so that namespace-like
 * objects are merged.
 *
 * Note that the target can be a function, in which case the properties in the source object are
 * copied onto it as static properties of the function.
 *
 * @param {any} target The value which is being extended.
 * @param {any} source The value whose properties are extending the target.
 * @return {any} The target value.
 */
function DeepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            const dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (const prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = DeepExtend(target[prop], source[prop]);
    }
    return target;
}
exports.DeepExtend = DeepExtend;
//# sourceMappingURL=deepCopy.js.map