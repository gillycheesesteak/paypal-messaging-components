/** @jsx h */
import { h } from 'preact';
import SpacedText from './SpacedText';

const ReplaceText = ({ textPart: [text, className], options }) => {
    const finalText = options.replace
        ? options.replace.reduce((accumulator, [substr, replacement]) => accumulator.replace(substr, replacement), text)
        : text;

    return <SpacedText className={className}>{finalText}</SpacedText>;
};

export default ReplaceText;
