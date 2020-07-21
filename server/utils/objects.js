/**
 * Deep clone an object
 * @param {Object} a Any object
 * @returns {Object} Cloned object
 */
export function objectClone(a) {
    return objectEntries(a).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            return {
                ...accumulator,
                [key]: [...val]
            };
        }
        if (typeof val === 'object') {
            return {
                ...accumulator,
                [key]: objectClone(val)
            };
        }

        return {
            ...accumulator,
            [key]: val
        };
    }, {});
}

/**
 * Create a new object with the second object merged into the first
 * @param {Object} a Base object
 * @param {Object} b Object to be merged in
 * @returns {Object} Merged object
 */
export function objectMerge(a, b) {
    const clone = objectClone(a);

    return (function deepMerge(targetObject, mergingObject) {
        return Object.entries(mergingObject).reduce((accumulator, [key, val]) => {
            // Just overwrite if val is an array
            if (Array.isArray(val)) {
                return {
                    ...accumulator,
                    [key]: [...val]
                };
            }

            // Overwrite if non-existent on targetObject or not an object
            if (
                typeof val === 'object' &&
                val !== null &&
                (!targetObject[key] || typeof targetObject[key] !== 'object' || Array.isArray(targetObject[key]))
            ) {
                return {
                    ...accumulator,
                    [key]: objectClone(val)
                };
            }

            // Set value to deep merge of 2 objects
            if (typeof val === 'object' && val !== null) {
                return {
                    ...accumulator,
                    [key]: deepMerge(targetObject[key], val)
                };
            }

            // Set new key value
            return {
                ...accumulator,
                [key]: val
            };
        }, targetObject);
    })(clone, b);
}

/**
 * Flatten object to array of deep key value strings
 * @param {Object} options Object of options
 * @param {String} prefix Prefix for current option property
 * @returns {Array<String>} Array of options as string
 */
export function objectFlattenToArray(options, prefix = '', delimiter = ':') {
    return objectEntries(options).reduce((accumulator, [key, val]) => {
        switch (typeof val) {
            case 'object': {
                return [...accumulator, ...objectFlattenToArray(val, `${prefix}${key}.`)];
            }
            case 'string':
            default: {
                return [...accumulator, `${prefix}${key}${delimiter}${val}`];
            }
        }
    }, []);
}

/**
 * Convert a string representation of an object path and value to an object
 * @param {String} option Object string path representation
 * @param {*} attributeValue Value to set on the object path
 * @param {String} delimiter Object nesting delimiter
 * @returns {Object} New nested object with provided value
 */
export function flattenedToObject(option, attributeValue, delimiter = '-') {
    const firstIndex = option.indexOf(delimiter);
    if (firstIndex === -1) {
        return { [option]: attributeValue };
    }

    const key = option.slice(0, firstIndex);
    const val = option.slice(firstIndex + 1);

    return { [key]: flattenedToObject(val, attributeValue) };
}
