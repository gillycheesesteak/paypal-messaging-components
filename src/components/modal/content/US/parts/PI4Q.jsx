/** @jsx h */
import { h } from 'preact';

import { useXProps, useServerData } from '../../../lib';
import Icon from '../../../parts/Icon';

const terms = (aprEntry = { apr: '', formattedDate: '' }) => [
    'Interest will be charged to your account from the purchase date if the balance is not paid in full within 6 months.',
    'A minimum monthly payment is required and may or may not pay off the promotional purchase by the end of the 6 month period.',
    'No interest will be charged on the purchase if you pay it off in full within 6 months. If you do not, interest will be charged on the purchase from the purchase date at the Purchase APR applicable to your account.',
    `For New Accounts: Variable Purchase APR is ${aprEntry.apr}%. The APR is accurate as of ${aprEntry.formattedDate} and will vary with the market based on the Prime Rate (as defined in your credit card agreement). Minimum interest charge is $2.00.`,
    'Individual items that are less than $99 qualify for special financing when combined for a total of $99 or more in a single transaction.',
    'Multiple separate transactions of less than $99 per transaction cannot be combined to meet the minimum purchase amount.'
];

const instructions = [
    [
        'card',
        'PayPal Credit is a reusable credit line you can use to shop online at millions of stores that accept PayPal.'
    ],
    ['shield', 'Shop with trust, security, and flexibility when you pay with PayPal.'],
    ['monogram', 'Click the PayPal button at checkout and pay with PayPal Credit.']
];

export default () => {
    const { onClick } = useXProps();
    const { aprEntry } = useServerData();

    return (
        <section className="content-body">
            <h2 className="title">No Interest if paid in full in 6 months on purchases of $99 or more</h2>
            <ul className="terms-list">
                {terms(aprEntry).map(term => (
                    <li className="terms-item">{term}</li>
                ))}
            </ul>

            <hr className="divider" />

            <h2 className="title">How PayPal Credit works</h2>
            <ul className="instructions-list">
                {instructions.map(([icon, instruction]) => (
                    <li className="instructions-item">
                        <div>
                            <Icon name={icon} />
                        </div>
                        <p>{instruction}</p>
                    </li>
                ))}
            </ul>

            <hr className="divider" />

            <div className="terms">
                <p>
                    <a
                        onClick={() => onClick({ linkName: 'Legal Terms' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/us/webapps/mpp/ppcterms"
                    >
                        Click here
                    </a>{' '}
                    to view the PayPal Credit Terms and Conditions.
                </p>
                <p>
                    PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                    available to US customers who are of legal age in their state of residence. You must pay with PayPal
                    Credit to get the offers. Offers not valid on previous purchases, returns or exchanges. Minimum
                    purchase required is before shipping and tax. For New Accounts: Variable Purchase APR is{' '}
                    {aprEntry.apr}%. The APR is accurate as of {aprEntry.formattedDate} and will vary with the market
                    based on the Prime Rate (as defined in your credit card agreement). Minimum interest charge is
                    $2.00.
                </p>
                <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
            </div>
        </section>
    );
};
