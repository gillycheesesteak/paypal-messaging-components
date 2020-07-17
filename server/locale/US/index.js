import validOptions from './validOptions';
import getMutations from './mutations';
import logos from './logos';
import styles from './styles';

export default {
    localeClass: 'locale--US',
    productName: ['with', 'PayPal Credit.'],
    validOptions,
    minimumSizeOptions: {
        'style.layout': 'text',
        'style.logo.position': 'top',
        'style.logo.type': 'primary'
    },
    getMutations,
    logos,
    styles
};
