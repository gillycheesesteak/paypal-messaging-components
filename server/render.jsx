/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import Message from './message';
import Wrapper from './message/locale';

export const renderMessage = (options, markup, addLog) => {
    return render(<Message addLog={addLog} options={options} markup={markup} locale={markup.meta.offerCountry} />);
};

export const renderWrapper = (options, markup, addLog) => {
    return render(<Wrapper addLog={addLog} options={options} markup={markup} locale={markup.meta.offerCountry} />);
};
