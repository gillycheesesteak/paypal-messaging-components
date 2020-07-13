/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import { objectGet, objectMerge, curry, objectFlattenToArray } from '../utils';
import { getMutations, getLocaleStyles, getLocaleClass } from '../locale';
import allStyles from './styles';
import fonts from './styles/fonts.css';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';

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
            if (key === 'default' || split.every(k => flattened.includes(k))) {
                const calculatedVal =
                    typeof val === 'function'
                        ? val({
                              textSize: objectGet(style, 'text.size')
                          })
                        : val;
                return type === Array ? [...accumulator, calculatedVal] : objectMerge(accumulator, calculatedVal);
            }

            return accumulator;
        },
        type === Array ? [] : {}
    )
);

export default ({ options, markup }) => {
    const layout = objectGet(options, 'style.layout');

    const styleSelectors = objectFlattenToArray(options.style);
    const offerType = objectGet(markup, 'meta.offerType');
    const data = objectGet(markup, 'data');

    const classNamePrefix = 'message';
    const applyCascadeRules = applyCascade(options.style, styleSelectors);
    const mutationRules = applyCascadeRules(Object, getMutations(offerType, `layout:${layout}`, data));

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass();
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(Array, getLocaleStyles(layoutProp)).map(rule =>
        rule.replace(/\.message/g, `.${localeClass} .message`)
    );
    const styleRules = [...globalStyleRules, ...localeStyleRules, ...mutationRules.styles];
    console.log(globalStyleRules);

    const textSize = objectGet(options, 'style.text.size');
    if (layout === 'text' && textSize) {
        styleRules.push(`.${classNamePrefix}__headline { font-size: ${textSize}px }`);
        styleRules.push(`.${classNamePrefix}__disclaimer { font-size: ${textSize}px }`);
    }

    // Set boundaries on the width of the message text to ensure proper line counts
    if (mutationRules.messageWidth) {
        if (typeof mutationRules.messageWidth === 'number') {
            styleRules.push(`.${classNamePrefix}__messaging { width: ${mutationRules.messageWidth}px }`);
        } else if (Array.isArray(mutationRules.messageWidth)) {
            styleRules.push(
                `.${classNamePrefix}__messaging { min-width: ${mutationRules.messageWidth[0]}px; max-width: ${mutationRules.messageWidth[1]}px }`
            );
        }
    }

    // TODO:
    // if (layout === 'text' && objectGet(options, 'style.text.fontFamily')) {
    //     prependStyle(newTemplate, createCustomFontFamily(options.account, objectGet(options, 'style.text.fontFamily')));
    // }

    return render(
        <div role="button" className="message" tabIndex="0" data-pp-message>
            <style dangerouslySetInnerHTML={{ __html: fonts }} />
            <style dangerouslySetInnerHTML={{ __html: styleRules.join('\n') }} />
            <div className={`message__container ${localeClass}`}>
                {/* foreground layer */}
                <div className="message__foreground" />

                {/* content layer */}
                <div className="message__content">
                    {/* PP Credit Logo */}
                    <Logo type={objectGet(options, 'style.logo.type')} mutations={mutationRules.logo} />

                    {/* Promotional Messaging */}
                    <div className="message__messaging">
                        <div className="message__promo-container">
                            <h5 className="message__headline">
                                <MutatedText tagData={data.headline} options={mutationRules.headline} />
                            </h5>
                            <h6 className="message__sub-headline">
                                <MutatedText tagData={data.subHeadline} options={mutationRules.subHeadline} />
                            </h6>
                        </div>
                        <p className="message__disclaimer">
                            <MutatedText tagData={data.disclaimer} options={mutationRules.disclaimer} />
                        </p>
                    </div>
                </div>
                {/* background layer */}
                <div className="message__background" />
            </div>
        </div>
    );
};
