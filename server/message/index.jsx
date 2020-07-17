/** @jsx h */
import { h } from 'preact';

import { objectGet, objectMerge, curry, objectFlattenToArray } from '../utils';
import { getMutations, getLocaleStyles, getLocaleClass, getLocalProductName } from '../locale';
import allStyles from './styles';
import fonts from './styles/fonts.css';
import Logo from './parts/Logo';
import MutatedText from './parts/MutatedText';
import FlexStyles from './parts/FlexStyles';

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

export default ({ options, markup, locale }) => {
    const layout = objectGet(options, 'style.layout');

    const styleSelectors = objectFlattenToArray(options.style);
    const offerType = objectGet(markup, 'meta.offerType');

    const classNamePrefix = 'message';
    const applyCascadeRules = applyCascade(options.style, styleSelectors);
    const mutationRules = applyCascadeRules(Object, getMutations(locale, offerType, `layout:${layout}`, markup));

    const layoutProp = `layout:${layout}`;
    const globalStyleRules = applyCascadeRules(Array, allStyles[layoutProp]);

    const localeClass = getLocaleClass();
    // Scope all locale-specific styles to the selected locale
    const localeStyleRules = applyCascadeRules(Array, getLocaleStyles(locale, layoutProp)).map(rule =>
        rule.replace(/\.message/g, `.${localeClass} .message`)
    );
    const styleRules = [...globalStyleRules, ...localeStyleRules, ...mutationRules.styles];

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

    const logoType = objectGet(options, 'style.logo.type');
    const logo = <Logo type={logoType} mutations={mutationRules.logo} />;

    const [withText, productName] = getLocalProductName(locale);

    // TODO:
    // if (layout === 'text' && objectGet(options, 'style.text.fontFamily')) {
    //     prependStyle(newTemplate, createCustomFontFamily(options.account, objectGet(options, 'style.text.fontFamily')));
    // }

    const ratio = objectGet(options, 'style.ratio');

    return (
        <div role="button" className="message" tabIndex="0" data-pp-message>
            <style dangerouslySetInnerHTML={{ __html: fonts }} />
            <style dangerouslySetInnerHTML={{ __html: styleRules.join('\n') }} />
            {layout === 'flex' || ratio ? <FlexStyles layout={layout} ratio={ratio} /> : null}
            <div className={`message__container ${localeClass}`}>
                {/* foreground layer */}
                <div className="message__foreground" />

                {/* content layer */}
                <div className="message__content">
                    {/* PP Credit Logo */}
                    {logoType !== 'none' && logoType !== 'inline' ? logo : null}

                    {/* Promotional Messaging */}
                    <div className="message__messaging">
                        <div className="message__promo-container">
                            <h5 className="message__headline">
                                <MutatedText tagData={markup.headline} options={mutationRules.headline} />
                                {logoType === 'inline' ? logo : null}{' '}
                                {logoType === 'none' ? (
                                    <span>
                                        {withText} <strong>{productName}</strong>
                                    </span>
                                ) : null}{' '}
                            </h5>
                            <h6 className="message__sub-headline">
                                <MutatedText tagData={markup.subHeadline} options={mutationRules.subHeadline} />{' '}
                            </h6>
                        </div>
                        <p className="message__disclaimer">
                            <MutatedText tagData={markup.disclaimer} options={mutationRules.disclaimer} />{' '}
                        </p>
                    </div>
                </div>
                {/* background layer */}
                <div className="message__background" />
            </div>
        </div>
    );
};
