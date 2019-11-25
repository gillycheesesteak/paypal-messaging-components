import Logo from '../logos';

export function basicMediaQuery(breakpoint) {
    return `
    .message__headline span.multi:nth-child(2) {
        display: none;
    }

    @media (min-width: ${breakpoint}px) {
        .message__headline span.multi:first-child {
            display: none;
            
        }

        .message__headline span.multi:nth-child(2) {
            display: inline;
            
        }
    }
`;
}

export const legacyNI = [
    [
        'default',
        {
            logo: Logo.PRIMARY.COLOR,
            headline: 'MEDIUM',
            subHeadline: 'SMALL',
            disclaimer: 'legacy-MEDIUM'
        }
    ],
    [
        'size:1000x36',
        {
            styles: ['.message__sub-headline { color: #009cde }', '.message__headline { display: block }']
        }
    ],
    ['size:234x100', { logo: Logo.PRIMARY.WHITE }],
    ['size:310x100', { logo: Logo.PRIMARY.WHITE }],
    [
        'size:340x60',
        {
            logo: Logo.PRIMARY.WHITE,
            styles: ['.message { max-width: 100% }']
        }
    ]
];

export default {
    'layout:text': [
        [
            'default',
            {
                styles: [
                    basicMediaQuery(290),
                    '.message__messaging { flex: 1 1 auto; }',
                    '@media (max-width: 289px) { .message__disclaimer { display: block; } }'
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: ['XSMALL', { tag: 'LARGE', br: ['purchases'] }],
                disclaimer: 'XSMALL'
            }
        ],
        ['logo.type:primary', { messageWidth: [130, 320] }],
        [
            'logo.type:inline',
            {
                messageWidth: [200, 1000],
                styles: [basicMediaQuery(280)],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'XSMALL', replace: [['time.', 'time']] },
                    { tag: 'LARGE', replace: [['$99+.', '$99+']], br: ['purchases'] }
                ]
            }
        ],
        [
            'logo.type:none',
            {
                messageWidth: [180, 1000],
                styles: [basicMediaQuery(280)],
                logo: false,
                headline: [
                    { tag: 'XSMALL', replace: [['time.', 'time']] },
                    { tag: 'LARGE', replace: [['$99+.', '$99+']], br: ['purchases'] }
                ]
            }
        ],
        [
            'logo.type:alternative',
            {
                styles: [basicMediaQuery(520)],
                logo: Logo.ALTERNATIVE.COLOR
            }
        ],
        ['logo.type:primary && logo.position:top', { styles: [basicMediaQuery(210)] }],
        ['logo.type:alternative && logo.position:top', { styles: [basicMediaQuery(210)] }],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: ['XSMALL', { tag: 'LARGE', weak: [2] }],
                disclaimer: 'XSMALL'
            }
        ],
        [
            'ratio:8x1',
            {
                headline: ['XSMALL', { tag: 'LARGE', weak: [2], br: ['months'] }]
            }
        ],
        [
            'ratio:1x1',
            {
                styles: ['@media (min-width: 150px) { .message__headline { font-size: 8vw } }']
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { tag: 'LARGE', weak: [2] },
                styles: [
                    '.message__logo-container { margin-bottom: 30%; }',
                    '.message__disclaimer span.multi:nth-of-type(1) { display: none; }',
                    '.message__headline { font-size: 1.1rem }'
                ],
                disclaimer: ['XLARGE', 'XSMALL']
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': legacyNI
};
