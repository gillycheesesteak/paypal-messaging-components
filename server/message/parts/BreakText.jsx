/** @jsx h */
import { h } from 'preact';
import ReplaceText from './ReplaceText';

function splitText(text, breakWord) {
    const breakIndex = text.indexOf(breakWord) + breakWord.length;
    const s1 = text.slice(0, breakIndex).trim();

    if (text.length !== breakIndex) {
        const s2 = text.slice(breakIndex).trim();
        return [s1, s2];
    }

    return [s1];
}

const BreakText = ({ textParts, options }) => {
    if (options.br) {
        const availableBreaks = [...options.br];
        return textParts.map(([text, className]) => {
            const containedBreaks = [];

            while (text.includes(availableBreaks[0])) {
                containedBreaks.push(availableBreaks[0]);
                availableBreaks.shift();
            }

            // Prevent unnecessary nesting if the entire span innerText would be wrapped in a single br span
            if (containedBreaks.length === 0 || (containedBreaks.length === 1 && text.endsWith(containedBreaks[0]))) {
                return <ReplaceText textPart={[text, `${className} br`]} options={options} />;
            }

            const breakText = containedBreaks.reduce(
                (accumulator, breakWord) => {
                    const split = splitText(accumulator[accumulator.length - 1], breakWord);
                    return [...accumulator.slice(0, -1), ...split];
                },
                [text]
            );

            return breakText.map(breakTextPart => (
                <ReplaceText textPart={[breakTextPart, `${className} br`]} options={options} />
            ));
        });
    }

    return textParts.map(textPart => <ReplaceText textPart={textPart} options={options} />);
};

export default BreakText;
