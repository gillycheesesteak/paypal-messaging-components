/** @jsx h */
import { h } from 'preact';
import { getDataByTag } from '../../utils';
import SpacedText from './SpacedText';
import BreakText from './BreakText';

const MutatedText = ({ tagData, options }) => {
    if (typeof options !== 'string' && typeof options !== 'object') return null;

    let uniformOptions;
    if (typeof options === 'string') {
        uniformOptions = [{ tag: options }];
    } else if (!Array.isArray(options)) {
        uniformOptions = [options];
    } else {
        uniformOptions = options;
    }

    return uniformOptions.map(op => {
        const { tag, ...option } = typeof op === 'string' ? { tag: op } : op;
        const textData = getDataByTag(tagData, tag);
        const uniformText = Array.isArray(textData) ? textData : [textData];
        const uniformTextParts = uniformText.map(text => (Array.isArray(text) ? text : [text, '']));

        return (
            <SpacedText className={`tag--${tag.split('.', 1)[0]} ${uniformOptions.length > 1 ? 'multi' : ''}`}>
                <BreakText textParts={uniformTextParts} options={option} />
            </SpacedText>
        );
    });
};

export default MutatedText;
