/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData, useContent } from '../../../lib';
import PieChart from './PieChart';

export default () => {
    const { terms } = useServerData();

    const content = useContent('PI4');

    // For now, only PI4 INST offer should be shown in this modal
    const offer = terms.offers.find(ofr => ofr.type === 'INST' && ofr.qualified);

    return (
        <section className="content-body">
            <div className="description">
                <h2>{content.headline}</h2>

                <p>{content.subHeadline}</p>

                <div className="payment-breakdown">
                    {offer ? (
                        <Fragment>
                            <div>
                                <PieChart filledPercent={25} />
                                <b>${offer.periodic}</b>
                                <div>Today</div>
                            </div>
                            <div>
                                <PieChart filledPercent={50} />
                                <b>${offer.periodic}</b>
                                <div>Week 2</div>
                            </div>
                            <div>
                                <PieChart filledPercent={75} />
                                <b>${offer.periodic}</b>
                                <div>Week 4</div>
                            </div>
                            <div>
                                <PieChart filledPercent={100} />
                                <b>${offer.periodic}</b>
                                <div>Week 6</div>
                            </div>
                        </Fragment>
                    ) : null}
                </div>

                <p>
                    {content.instructions.title[0]}
                    <b>{content.instructions.title[1]}</b>
                    {content.instructions.title[2]}
                    <b>{content.instructions.title[3]}</b>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>About Pay in 4</h3>
                <ul>
                    {content.instructions.items.map(inst => (
                        <li>{inst}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
