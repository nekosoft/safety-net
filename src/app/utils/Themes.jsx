import { createMuiTheme } from '@material-ui/core/styles';

var baseTheme = createMuiTheme( {
    spacing: {
        unit: '8'
    },
    sp: (multiplier) => multiplier * 8 + 'px',
    palette: {
        primary: {
            light: '#00ff00',
            main: '#DD1D80',
            dark: '#000'
        },
        secondary: {
            light: '#ffffff',
            main: '#EFE3E4',
            dark: '#C8097A',
            contrastText: '#C8097A',
        },
    },
    typography: {
        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif'
    }
});

var appTheme = baseTheme => ({
    ...baseTheme,
    overrides: {
        MuiButton: {
            root: {
                [baseTheme.breakpoints.up('sm')]: {
                    padding: '16px 40px 17px',
                    maxWidth: 'none',
                    width: 'auto',
                },
                maxWidth: '400px',
                borderRadius: '32px',
                margin: `0 ${baseTheme.spacing.unit * 2}px ${baseTheme.spacing.unit * 2}px 0`,
                textTransform: 'none',
                fontSize: '16px',
                padding: '13px 40px 14px',
                letterSpacing: '-0.04em',
                lineHeight: '20px',
                boxSizing: 'border-box',
                fontWeight: '500',
                '&:hover': {
                    color: baseTheme.palette.primary.main,
                    boxShadow: '0px 6px 20px rgba(98, 45, 45, 0.12)',
                    background: 'white',
                    '@media (hover: none)': {
                        color: 'white',
                    }
                }
            },
            contained: {
                boxShadow: 'none',
                fontWeight: 'bold',
                '&$disabled': {
                    backgroundColor: '#E9E4E3',
                    color: '#B4B4B4'
                }
            },
            containedSecondary: {
                boxShadow: '0px 6px 20px rgba(98, 45, 45, 0.12)',
                backgroundColor: 'white',
                '&:hover': {
                    color: 'white',
                    backgroundColor: baseTheme.palette.primary.main,

                    '@media (hover: none)': {
                        color: 'white'
                    }
                }
            },
            textSecondary: {
                color: baseTheme.palette.primary.main,
                textDecoration: 'underline',
                padding: '17px 30px',
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }
        },
        MuiButtonBase: {
            root: {
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
            }
        },
        MuiCard: {
            root: {
                position: 'relative',
                background: 'white',
                borderRadius: '8px',
                boxShadow: 'none',
                overflow: 'visible',
                [baseTheme.breakpoints.up('sm')]: {
                    boxShadow: '0px 10px 20px rgba(110, 1, 1, 0.06);',
                    overflow: 'hidden',
                }
            }
        },
        MuiInput: {
            formControl: {
                'label + &': {
                    marginTop: '30px'
                }
            },
            root: {
                '&$focused': {
                    boxShadow: '0px 3px 8px rgba(108, 108, 108, 0.16)'
                },
                borderRadius: '30px',
                padding: '7px 16px',
                background: 'white',
                border: '1px solid #E9E4E3',
                transition: 'box-shadow 0.2s',
                [baseTheme.breakpoints.up('sm')]: {
                    padding: '10px 16px',
                    borderRadius: '7px',
                    width: '90%',
                },
            },
            multiline: {
                padding: '7px 12px',
                borderRadius: '7px',
                [baseTheme.breakpoints.up('sm')]: {
                    padding: '10px 16px',
                    width: '90%',
                }
            }
        },
    },
});

export { baseTheme, appTheme };