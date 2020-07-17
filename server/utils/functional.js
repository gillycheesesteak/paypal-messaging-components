/**
 * Curry a function
 * @param {Function} fn Function to curry
 * @param {Number} arity Number of function parameters
 * @returns {Function} Curried function
 */
export function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length < arity) {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }

        return fn(...args);
    };
}
