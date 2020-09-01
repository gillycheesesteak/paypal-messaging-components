/** @jsx h */
import { h } from 'preact';

import Carousel from './Carousel';
import Calculator from './Calculator';
import { useContent } from '../../../lib';

const INST = () => {
    const content = useContent('INST');

    return (
        <section className="content-body">
            <Carousel
                items={[
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_shoppingcart.svg',
                        imageAlt: 'Shopping cart icon',
                        description: content.carousel[0]
                    },
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_calendar.svg',
                        imageAlt: 'Calendar icon',
                        description: content.carousel[1]
                    },
                    {
                        imageSrc: 'https://www.paypalobjects.com/upstream/assets/img/de/icon_payovertime.svg',
                        imageAlt: 'Clock and wallet icon',
                        description: content.carousel[2]
                    }
                ]}
            />

            {/* <!-- Calculator --> */}
            <div className="calculator-container">
                <Calculator country="DE" />
            </div>
        </section>
    );
};

export default INST;
