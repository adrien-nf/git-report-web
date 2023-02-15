import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
	palette: {
		background: {
			default: "transparent",
			paper: "transparent",
		},
		primary: {
			"500": "#00c2ff",
		},
		mode: 'dark',
	},
	typography: {
		h2: {
			fontSize: '22px',
			fontWeight: 400,
			marginBottom: '25px',
		},
		fontFamily: [
			"Roboto",
			'Caveat',
		].join(','),
	},
	breakpoints: {
		values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100,
      xl: 1350,
    },
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
		}
	}
});