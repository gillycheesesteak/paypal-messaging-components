import render from 'preact-render-to-string';

import Message from './message';

export default (options, markup) => {
    return render(Message({ options, markup, locale: markup.meta.offerCountry }));
};
