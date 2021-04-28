import US from './US';
import DE from './DE';
import GB from './GB';
import FR from './FR';

const getLocaleSettings = offerCountry => {
    switch (offerCountry) {
        case 'DE':
            return DE;
        case 'GB':
            return GB;
        case 'FR':
            return FR;
        case 'US':
        default:
            return US;
    }
};

const getLocaleOfferSettings = (offerCountry, offerType) => {
    const settings = getLocaleSettings(offerCountry);

    return typeof settings.config === 'function'
        ? {
              styles: settings.styles,
              ...settings.config(offerType)
          }
        : settings;
};

export function getLocaleClass(locale) {
    return getLocaleSettings(locale).localeClass;
}

export function getProductClass(locale, offerType) {
    return getLocaleOfferSettings(locale, offerType).productClass;
}

export function getLocaleProductName(locale, offerType) {
    return getLocaleOfferSettings(locale, offerType).productName;
}

export function getValidOptions(locale, offerType) {
    return getLocaleOfferSettings(locale, offerType).validOptions;
}

export function getMutations(locale, offerType, type) {
    if (type === 'layout:custom') return {};
    const mutations = getLocaleOfferSettings(locale, offerType)
        .getMutations(offerType, type)
        .map(mutation => {
            if (mutation[1].styles) {
                return [
                    mutation[0],
                    {
                        ...mutation[1],
                        styles: mutation[1].styles.map(style =>
                            style.replace(/\.message/g, `.${getLocaleClass(locale, offerType)} .message`)
                        )
                    }
                ];
            }

            return mutation;
        });

    return mutations;
}

export function getLogos(locale, offerType) {
    return getLocaleOfferSettings(locale, offerType).logos;
}

export function getLocaleStyles(locale, layout) {
    const { styles } = getLocaleSettings(locale) ?? {};
    return (
        (Array.isArray(styles)
            ? styles.reduce(
                  (accumulator, product) => ({
                      ...accumulator,
                      [product.productClass]: product.styles[layout]
                  }),
                  {}
              )
            : styles[layout]) ?? []
    );
}

export function getLocaleOfferStyles(locale, layout, offerType) {
    const { styles } = getLocaleOfferSettings(locale, offerType) ?? {};
    return styles?.[layout] ?? [];
}

export function getMinimumWidthOptions(locale, offerType) {
    return getLocaleOfferSettings(locale, offerType).minimumSizeOptions ?? {};
}
