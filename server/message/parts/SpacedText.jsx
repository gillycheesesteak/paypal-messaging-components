/** @jsx h */
/** @jsxFrag Fragment */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from 'preact';

const SpacedText = ({ children, className }) => (
    <>
        <span className={className}>{children}</span>{' '}
    </>
);

export default SpacedText;
