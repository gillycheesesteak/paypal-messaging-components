export const populateTemplate = (morsVars, template) =>
    Object.entries(morsVars)
        .reduce(
            (accumulator, [morsVar, val]) =>
                // eslint-disable-next-line security/detect-non-literal-regexp
                accumulator.replace(new RegExp(`(\\\${CREDIT_OFFERS_DS\\.|{)${morsVar}}`, 'g'), val),
            template
        )
        .replace(/\r\n|\r|\n/g, '');
