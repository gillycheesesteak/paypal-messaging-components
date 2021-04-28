import gpl from './GPL/index';
import ppc from './PPC/index';

export default {
    styles: [
        {
            productClass: 'product--PPC',
            styles: ppc.styles
        },
        {
            productClass: 'product--GPL',
            styles: gpl.styles
        }
    ],
    localeClass: 'locale--US',
    config: offerType => {
        switch (offerType) {
            case 'GPL':
            case 'GPLQ':
            case 'GPLNQ':
            case 'GPLNQ_RANGE':
                return gpl;
            default:
                return ppc;
        }
    }
};
