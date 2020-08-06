/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useTransitionState, useApplyNow, useServerData } from '../lib';
import Icon from './Icon';
import Button from './Button';

const LOCALE = {
    LOGO: {
        DE: 'logo-de',
        GB: 'logo-gb',
        US: 'logo'
    }
};

const Header = () => {
    const { country } = useServerData();
    const [transitionState, handleClose] = useTransitionState();
    const [showApplyNow, setApplyNow] = useState(false);
    const handleApplyNowClick = useApplyNow('Apply Now Header');

    useEffect(() => {
        const handleApplyNowShow = () => !showApplyNow && setApplyNow(true);
        const handleApplyNowHide = () => showApplyNow && setApplyNow(false);

        window.addEventListener('apply-now-visible', handleApplyNowShow);
        window.addEventListener('apply-now-hidden', handleApplyNowHide);

        return () => {
            window.removeEventListener('apply-now-visible', handleApplyNowShow);
            window.removeEventListener('apply-now-hidden', handleApplyNowHide);
        };
    }, [showApplyNow]);

    useEffect(() => {
        if (transitionState === 'CLOSED') {
            setApplyNow(false);
        }
    }, [transitionState]);

    // const showApplyNow = country === 'US' && hasShadow;

    return (
        <div className="modal__header-wrapper">
            <div className="modal__header-container">
                <header className="modal__header">
                    <div className={`header__logo-wrapper ${showApplyNow ? 'header__logo-wrapper--shift' : ''}`}>
                        <div className="header__logo" alt="PayPal Credit Logo">
                            <Icon name={LOCALE.LOGO[country]} />
                        </div>
                    </div>
                    {country !== 'GB' && (
                        <Button
                            className="header__apply-now"
                            style={{
                                opacity: showApplyNow ? 1 : 0,
                                transform: showApplyNow ? 'translate(-50%, 0)' : 'translate(-50%, 1.3rem)'
                            }}
                            onClick={handleApplyNowClick}
                        >
                            Apply Now
                        </Button>
                    )}
                    <button
                        className="header__close"
                        aria-label="Close"
                        type="button"
                        id="close-btn"
                        onClick={() => handleClose('Close Button')}
                    >
                        <Icon name="close" />
                    </button>
                </header>
            </div>
        </div>
    );
};

export default Header;
