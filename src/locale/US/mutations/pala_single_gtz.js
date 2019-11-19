import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: { tag: 'SMALL' },
                disclaimer: 'XSMALL'
            }
        ],
        ['logo.type:primary', { messageWidth: [140, 210] }],
        [
            'logo.type:inline',
            {
                messageWidth: [200, 1000],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: { br: ['/mo'] }
            }
        ],

        [
            'logo.type:none',
            {
                messageWidth: [200, 1000],
                logo: false,
                headline: {
                    br: ['/mo']
                }
            }
        ],
        ['logo.type:alternative', { logo: Logo.ALTERNATIVE.COLOR }],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'SMALL', br: ['of'] },
                subHeadline: 'SMALL',
                disclaimer: 'XSMALL'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments'] },
                subHeadline: { tag: 'SMALL', br: ['money'] }
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-XSMALL',
                subHeadline: 'legacy-LARGE',
                disclaimer: 'legacy-MEDIUM'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR }],
        ['size:120x90', { logo: false }],
        ['size:250x250', { disclaimer: 'legacy-MEDIUM.2' }],
        ['size:340x60', { disclaimer: 'legacy-MEDIUM.2' }],
        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
        ['size:170x100', { logo: false, headline: 'legacy-XSMALL' }]
    ]
};
