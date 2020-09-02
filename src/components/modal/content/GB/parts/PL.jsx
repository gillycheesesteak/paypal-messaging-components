/** @jsx h */
import { h, Fragment } from 'preact';
import { useCalculator } from '../../../lib/hooks';
import Icon from '../../../parts/Icon';
import { useContent } from '../../../lib';

const isEligible = terms => {
    const content = useContent('GPL', {
        terms
    });

    if (typeof terms.amount === 'undefined' || terms.amount < terms.minAmount || terms.amount > terms.maxAmount) {
        return (
            <h1 className="offer">
                {content.headline.unqualified[0]} <br /> {content.headline.unqualified[1]}
            </h1>
        );
    }

    return (
        <h1 className="offer">
            {content.headline.qualified[0]} <br /> {content.headline.qualified[1]}
        </h1>
    );
};

const PL = () => {
    const { terms } = useCalculator();
    const content = useContent('GPL', {
        terms,
        offer: terms.offers[0]
    });

    return (
        <div className="content-body">
            <div className="left">
                {isEligible(terms)}
                <p className="subheadline">
                    {!terms.error && terms.formattedMinAmount && terms.formattedMaxAmount
                        ? content.subHeadline.qualified
                        : content.subHeadline.unqualified}
                </p>
                <Icon name="icecream" />
                <div className="thumbs-up">
                    <Icon name="thumbs-up" />
                </div>
                <div className="terms">
                    <p>
                        {content.terms.map(term => (
                            <Fragment>
                                {term}
                                <br />
                            </Fragment>
                        ))}
                    </p>
                </div>
            </div>
            <div className="right">
                <h2 className="title">Buy now, pay later</h2>
                <div className="info">
                    <Icon name="shopping-bag" />
                    <p>
                        {content.instructions[0][0]} <br />
                        {content.instructions[0][1]}
                    </p>
                    <Icon name="checkmark" />
                    <p>
                        {content.instructions[1][0]} <br />
                        {content.instructions[1][1]}
                    </p>
                    <Icon name="pp-button" />
                    <p>
                        {content.instructions[2][0]} <br />
                        {content.instructions[2][1]} <span>{content.productName}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PL;
