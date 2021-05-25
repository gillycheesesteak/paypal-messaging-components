/** @jsx h */
import objectEntries from 'core-js-pure/stable/object/entries';
import { h } from 'preact';
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { ZalgoPromise } from 'zalgo-promise/src';

import { request, getActiveTags, getStorage, setStorage } from '../../utils';
import { useXProps, useServerData, useDidUpdateEffect, useDidUpdateLayoutEffect } from './lib';

const Message = () => {
    const {
        amount,
        currency,
        buyerCountry,
        style,
        offer,
        payerId,
        clientId,
        merchantId,
        version,
        env,
        onClick,
        onReady,
        onHover,
        onMarkup,
        resize,
        stageTag,
        merchantConfigHash
    } = useXProps();
    const { markup, meta, parentStyles, warnings, setServerData, messageMarkup } = useServerData();
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const buttonRef = useRef();

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick({ meta });
        }
    };

    const handleHover = () => {
        if (typeof onHover === 'function') {
            onHover({ meta });
        }
    };

    useLayoutEffect(() => {
        if (typeof onMarkup === 'function' && messageMarkup) {
            onMarkup({ meta, styles: parentStyles, warnings });
        }
    }, [parentStyles, warnings, markup]);

    useLayoutEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ meta, activeTags: getActiveTags(buttonRef.current) });
        }
    }, [meta?.messageRequestId]);

    useDidUpdateLayoutEffect(() => {
        const buttonWidth = buttonRef.current.offsetWidth;
        const buttonHeight = buttonRef.current.offsetHeight;

        // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
        // in the overflow observer will not fire. This forces the resize event to fire for every render
        // so that the render complete logs will always fire
        if (dimensionsRef.current.width === buttonWidth && dimensionsRef.current.height === buttonHeight) {
            resize({ width: buttonWidth, height: buttonHeight });
        } else {
            dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
        }
    });

    useEffect(() => {
        const query = objectEntries({
            amount,
            currency,
            buyer_country: buyerCountry,
            style,
            credit_type: offer,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId,
            version,
            stageTag,
            env
        })
            .filter(([, val]) => Boolean(val))
            .reduce(
                (acc, [key, val]) =>
                    `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                ''
            )
            .slice(1);

        // merchantConfigHash and amount should be sent in these requests
        // to be used by the CDN as "cache keys" to cache responses for both requests
        // these values can be included in the url to get automatic cache handling
        // or custom rules can be configured in the CDN to only check certain query params
        ZalgoPromise.all([
            request('GET', `${window.location.origin}/credit-presentment/renderMessage?${query}`),
            request(
                'GET',
                `https://uideploy--staticcontent--45b0eb3695776--ghe.preview.dev.paypalinc.com/upstream/assets/cdn-cache-test/variables.json`
            )
        ]).then(([{ data: content }, { data: variables }]) => {
            console.log(content);
            setServerData({
                messageMarkup: Object.entries(variables).reduce(
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    (accumulator, [key, val]) => accumulator.replace(new RegExp(`{{${key}}}`, 'g'), val),
                    content.markup
                ),
                meta: content.meta,
                // Respect empty string value in order to remove styles when switch from flex to text layout
                parentStyles: content.parentStyles,
                warnings: content.warnings
            });
        });
    }, [amount, currency, buyerCountry, JSON.stringify(style), offer, payerId, clientId, merchantId]);

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={handleClick}
            onMouseOver={handleHover}
            onFocus={handleHover}
            aria-label="PayPal Credit Message"
            style={{
                display: 'block',
                background: 'transparent',
                padding: 0,
                border: 'none',
                outline: 'none',
                textAlign: style?.text?.align || 'left',
                fontFamily: 'inherit',
                fontSize: 'inherit'
            }}
        >
            <div innerHTML={markup} />
            {messageMarkup ? <div innerHTML={messageMarkup} /> : null}
        </button>
    );
};

export default Message;
