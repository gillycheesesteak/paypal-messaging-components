/** @jsx h */
import { h } from 'preact';

import { useServerData, useApplyNow, useContent } from '../../../lib';
import Button from '../../../parts/Button';

export default () => {
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { aprEntry } = useServerData();

    const content = useContent('NI', { aprEntry });

    return (
        <section className="content-body">
            <div className="description">
                <h2>{content.headline}</h2>

                <p>{content.subHeadline}</p>

                <div className="payment-breakdown" />

                <p className="apply-now">
                    <div>
                        <p>
                            <b>{content.applyNow.headline}</b>
                        </p>
                        <span>{content.applyNow.subHeadline}</span>
                    </div>
                    <Button onClick={handleApplyNowClick}>Apply Now</Button>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>{content.terms.title}</h3>
                <ul>
                    {content.terms.items.map(term => (
                        <li>{term}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
