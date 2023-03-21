import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
	palette: {
		background: {
			default: "#081115",
			paper: "transparent",
		},
		primary: {
			"500": "#00c2ff",
		},
		mode: 'dark',
	},
	typography: {
		h1: {
			marginBottom: '40px',
			fontFamily: '\'Kanit\', sans-serif',
			fontWeight: 300,
			fontSize: '3rem',
			lineHeight: 1.1,
		},
		h2: {
			fontSize: '26px',
			fontWeight: 400,
			marginBottom: '25px',
			fontFamily: '\'Kanit\', sans-serif'
		},
		h3: {
			fontWeight: 400,
			fontFamily: '\'Kanit\', sans-serif',
		},
		fontFamily: '\'Open Sans\', sans-serif',
		fontSize: 14,
	},
	components: {
		MuiSlider: {
			styleOverrides: {
				root: {
					height: "2.5em",
					borderRadius: 2,
				},
				thumb: {
					height: "2.5em",
					borderRadius: 0,
					width: "1em",
				},
				track: {
					color: "#092d39",
				},
				rail: {
					color: "#092d39",
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#0B1316",
					borderRadius: 0,
				}
			},
			defaultProps: {
				variant: "outlined",
			}
		},
		MuiLink: {
			defaultProps: {
				underline: "none",
			}
		},
		MuiButton: {
			defaultProps: {
				color: "secondary",
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					fontFamily: '\'Kanit\', sans-serif',
					textTransform: 'none',
					fontWeight: 'normal',
					padding: '5px 20px',
					borderRadius: '4px',
					fontSize: '16px',
					boxShadow: 'none',
					':hover': {
						boxShadow: 'none',
					}
				},
				containedSecondary: {
					backgroundColor: '#101E21',
					color: '#9AE7FF',
					':hover': {
						backgroundColor: '#9AE7FF25',
					}
				}
			}
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					scrollBehavior: 'smooth',
				},
				body: {
					backgroundImage: 'radial-gradient(119.15% 198.32% at 105.13% 105.06%, #081C24 0%, #0A0A0A 100%)',
					overflowY: 'hidden',
				}
			}
		}
	}
});