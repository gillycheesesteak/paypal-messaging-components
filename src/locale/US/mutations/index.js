import ni from './ni';
import niNonUs from './ni_non-us';
import ezpAnyEqz from './ezp_any_eqz';
import ezpAnyGtz from './ezp_any_gtz';
import palaMultiEqz from './pala_multi_eqz';
import palaMultiGtz from './pala_multi_gtz';
import palaSingleEqz from './pala_single_eqz';
import palaSingleGtz from './pala_single_gtz';

export default function getMutations(id, type) {
    switch (id) {
        case 'US:PPC:EZP_ANY_EQZ':
            return ezpAnyEqz[type];
        case 'US:PPC:EZP_ANY_GTZ':
            return ezpAnyGtz[type];
        case 'US:PPC:PALA_MULTI_EQZ':
            return palaMultiEqz[type];
        case 'US:PPC:PALA_MULTI_GTZ':
            return palaMultiGtz[type];
        case 'US:PPC:PALA_SINGLE_EQZ':
            return palaSingleEqz[type];
        case 'US:PPC:PALA_SINGLE_GTZ':
            return palaSingleGtz[type];
        case 'US:PPC:NI_NON-US':
            return niNonUs[type];
        case 'US:PPC:NI':
        default:
            return ni[type];
    }
}
