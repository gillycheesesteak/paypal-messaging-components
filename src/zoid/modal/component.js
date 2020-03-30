import { create } from 'zoid/src';

import { getTargetMeta, getGlobalUrl, getGlobalComponent } from '../../utils';
import containerTemplate from './containerTemplate';

export default getGlobalComponent('__paypal_credit_modal__', () =>
    create({
        tag: 'paypal-credit-modal',
        url: getGlobalUrl('MODAL'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        attributes: {
            iframe: {
                scrolling: 'no'
            }
        },
        props: {
            account: {
                type: 'object',
                queryParam: false,
                required: true,
                serialization: 'json'
            },
            type: {
                type: 'string',
                queryParam: true,
                required: true
            },
            country: {
                type: 'string',
                queryParam: true,
                required: true
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false
            },
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onCalculate: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onClose: {
                type: 'function',
                queryParam: false,
                required: false
            },

            // Computed Props
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                value: ({ props }) => (props.account.type === 'payer_id:' ? props.account.id : undefined),
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                value: ({ props }) => (props.account.type === 'client-id:' ? props.account.id : undefined),
                required: false
            },
            merchantId: {
                type: 'string',
                queryParam: 'merchant_id',
                value: ({ props }) => props.account.subject,
                required: false
            },
            targetMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                value: getTargetMeta
            }
        }
    })
);
