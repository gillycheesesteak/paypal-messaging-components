const { version } = require('./package.json');

module.exports = (env = {}) => ({
    __MESSAGES__: {
        __VERSION__: version,
        __DEMO__: !!env.demo,
        __TARGET__: (() => {
            if (env.legacy) {
                return 'LEGACY';
            }
            if (env.standalone) {
                return 'STANDALONE';
            }
            return 'SDK';
        })(),
        __DOMAIN__: {
            __LOCAL__: 'http://localhost.paypal.com:8080',
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com',

            __MESSAGE__: {
                __LOCAL__: env.localMessage ? 'http://localhost.paypal.com:8080' : 'https://www.paypal.com'
            },
            __MODAL__: {
                __LOCAL__: env.localModal ? 'http://localhost.paypal.com:8080' : 'https://www.paypalobjects.com',
                __STAGE__: 'https://www.paypalobjects.com',
                __SANDBOX__: 'https://www.paypalobjects.com',
                __PRODUCTION__: 'https://www.paypalobjects.com'
            },
            __LOGGER__: {
                __LOCAL__: env.localPPCredit ? 'http://localhost.paypal.com:8000' : 'https://www.paypal.com'
            },
            __TERMS__: {
                __LOCAL__: env.localPPCredit ? 'http://localhost.paypal.com:8000' : 'https://www.paypal.com'
            }
        },
        __URI__: {
            __MESSAGE__: '/imadserver/upstream',
            __MODAL__: '/upstream/assets/messaging/modal',
            __LOGGER__: '/ppcredit/messagingLogger',
            __TERMS__: '/ppcredit/finance/terms'
        }
    }
});
