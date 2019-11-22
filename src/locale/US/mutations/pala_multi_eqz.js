import Logo from '../logos';

export default {
    'layout:text': [
        [
            'default',
            {
                logo: Logo.PRIMARY.COLOR,
                headline: {
                    tag: 'SMALL',
                    br: ['/mo']
                },
                disclaimer: 'SMALL'
            }
        ],
        ['logo.type:primary', { messageWidth: [130, 200] }],
        [
            'logo.type:inline',
            {
                messageWidth: [200, 1000],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: {
                    replace: [['APR.', 'APR']]
                }
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [200, 1000],
                logo: false,
                headline: {
                    replace: [['APR.', 'APR']]
                }
            }
        ],
        [
            'logo.type:alternative',
            {
                messageWidth: [140, 430],
                logo: Logo.ALTERNATIVE.COLOR
            }
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'MEDIUM', br: ['low as', 'at'] },
                subHeadline: 'SMALL',
                disclaimer: 'XSMALL'
            }
        ],
        ['ratio:1x4', { subHeadline: { tag: 'SMALL', br: ['money'] } }],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-MEDIUM',
                subHeadline: 'legacy-LARGE',
                disclaimer: 'legacy-SMALL'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR, disclaimer: 'legacy-MEDIUM' }],
        ['size:120x90', { logo: false, headline: 'legacy-SMALL', disclaimer: 'legacy-MEDIUM' }],
        ['size:234x60', { headline: 'legacy-SMALL', disclaimer: 'legacy-MEDIUM' }],
        ['size:300x50', { disclaimer: 'legacy-MEDIUM' }],
        ['size:468x60', { disclaimer: 'legacy-MEDIUM' }],
        [
            'size:250x250',
            {
                headline: 'legacy-LARGE'
            }
        ],
        ['size:728x90', { headline: 'legacy-SMALL', disclaimer: 'legacy-MEDIUM' }],
        ['size:540x200', { disclaimer: 'legacy-MEDIUM' }],
        ['size:170x100', { logo: false, headline: 'legacy-SMALL', disclaimer: 'legacy-MEDIUM' }]
    ]
};
