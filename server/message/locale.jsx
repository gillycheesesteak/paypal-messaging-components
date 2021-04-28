/** @jsx h */
import { h } from 'preact';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { objectMerge, objectFlattenToArray, curry } from '../../src/utils/server';
import { getLocaleStyles, getLocaleClass } from '../locale';
import allStyles from './styles';
import Styles from './parts/Styles';

/**
 * Get all applicable rules based on user flattened options
 * and available rules to cascade
 * @param {Array<String>} flattened Flattened style options
 * @param {any} type Desired return value type
 * @param {Array<Array<any>>} rules Rules to apply the cascade
 * @returns {Object|Array} Applicable rules
 */
const applyCascade = curry((style, flattened, type, rules) =>
    rules.reduce(
        (accumulator, [key, val]) => {
            const split = key.split(' && ');
            if (key === 'default' || split.every(k => arrayIncludes(flattened, k))) {
                const calculatedVal =
                    typeof val === 'function'
                        ? val({
                              textSize: style.text?.size
                          })
                        : val;
                return type === Array ? [...accumulator, calculatedVal] : objectMerge(accumulator, calculatedVal);
            }

            return accumulator;
        },
        type === Array ? [] : {}
    )
);

export default ({ options, locale }) => {
    const { style } = options;
    const { layout } = style;

    const styleSelectors = objectFlattenToArray(style);
    const applyCascadeRules = applyCascade(style, styleSelectors);

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    // Scope all locale-specific styles to the selected locale
    const localeClass = getLocaleClass(locale);
    const localeStyles = getLocaleStyles(locale, layoutProp);
    console.log(localeClass);
    const normalizedLocaleStyles = Array.isArray(localeStyles) ? { '': localeStyles } : localeStyles;
    const localeStyleRules = Object.entries(normalizedLocaleStyles).reduce(
        (accumulator, [productClass, styles]) => [
            ...accumulator,
            ...applyCascadeRules(Array, styles).map(rule =>
                rule.replace(/\.message/g, `.${localeClass}${productClass === '' ? '' : `.${productClass}`} .message`)
            )
        ],
        []
    );

    return <Styles globalStyleRules={globalStyleRules} localeStyleRules={localeStyleRules} />;
};
