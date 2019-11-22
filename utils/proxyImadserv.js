const fs = require('fs');
const got = require('got');

const devAccountMap = {
    DEV00000000NI: ['US', 'ni'],
    DEV000NINONUS: ['US', 'ni_non-us'],
    DEV0000000EAZ: ['US', 'ezp_any_eqz'],
    DEV0000000EAG: ['US', 'ezp_any_gtz'],
    DEV0000000PSZ: ['US', 'pala_single_eqz'],
    DEV0000000PSG: ['US', 'pala_single_gtz'],
    DEV0000000PMZ: ['US', 'pala_multi_eqz'],
    DEV0000000PMG: ['US', 'pala_multi_gtz'],

    DEV0000000IAZ: ['DE', 'inst_any_eqz'],
    DEV0000000IAG: ['DE', 'inst_any_gtz'],
    DEV000000PQAG: ['DE', 'palaq_any_gtz'],
    DEV000000PQAZ: ['DE', 'palaq_any_eqz']
};

module.exports = function proxyImadserv(app) {
    app.get('/crcpresentmentnodeweb/messages', (req, res) => {
        const { currency_value: amount = 0, dimensions } = req.query;
        const account = req.query.payer_id ? req.query.payer_id : req.query.client_id;

        if (devAccountMap[account]) {
            const banner =
                dimensions !== 'x199x99'
                    ? fs.readFileSync(`banners/${devAccountMap[account].join('/')}.json`, 'utf-8')
                    : fs.readFileSync(`banners/ni.json`, 'utf-8');

            const morsVars = {
                total_payments: 12,
                formattedMonthlyPayment: `$${Number(amount / 12).toFixed(2)}`
            };

            const populateVars = str =>
                Object.entries(morsVars)
                    .reduce(
                        (accumulator, [morsVar, val]) =>
                            accumulator.replace(new RegExp(`\\\${CREDIT_OFFERS_DS.${morsVar}}`, 'g'), val),
                        str
                    )
                    .replace(/\r\n|\r|\n/g, '');

            const populatedBanner = JSON.parse(populateVars(banner));

            res.send(populatedBanner);
        } else {
            const query = Object.entries(req.query)
                .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
                .slice(1);

            got(`https://www.paypal.com/imadserver/upstream?${query}`)
                .then(({ body, headers }) => {
                    delete headers['content-encoding']; // eslint-disable-line no-param-reassign
                    res.set(headers);
                    res.send(body);
                })
                .catch(err => console.log(err) || res.status(404).send());
        }
    });
};
