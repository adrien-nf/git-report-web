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
		fontFamily: [
			"Roboto",
			'Caveat',
		].join(','),
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
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage: 'radial-gradient(119.15% 198.32% at 105.13% 105.06%, #081C24 0%, #0A0A0A 100%)',
				}
			}
		}
	}
});