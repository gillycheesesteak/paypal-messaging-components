/** @jsx h */
import { h } from 'preact';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { objectMerge, objectFlattenToArray, curry } from '../../src/utils/server';
import { getLocaleStyles, getLocaleClass, getMinimumWidthOptions } from '../locale';
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

export default ({ options, markup, locale }) => {
    // Because offerType is necessary and impacts the locale styles, we cannot reuse this agnostic of "amount"
    // Is there a way to make the locale styles agnostic of amount and offerType so they can be reused?
    // If not, this wrapper can only include a very limited bit of global styles
    const offerType = markup?.meta?.offerType;
    const style =
        options.style.layout === 'text' && options.style.preset === 'smallest'
            ? objectMerge(options.style, getMinimumWidthOptions(locale, offerType))
            : options.style;

    const { layout } = style;

    const styleSelectors = objectFlattenToArray(style);
    const applyCascadeRules = applyCascade(style, styleSelectors);

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass(locale, offerType);
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(Array, getLocaleStyles(locale, layoutProp, offerType)).map(rule =>
        rule.replace(/\.message/g, `.${localeClass} .message`)
    );

    return <Styles globalStyleRules={globalStyleRules} localeStyleRules={localeStyleRules} />;
};
