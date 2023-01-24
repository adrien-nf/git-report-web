import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { DataContextProvider } from "./contexts/DataContext/DataContext";
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const darkTheme = createTheme({
	palette: {
		background: {
			default: "transparent",
			paper: "transparent",
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
					color: "#00C2FF",
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
		}
	}
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<SnackbarProvider maxSnack={3}>
			<BrowserRouter>
				<DataContextProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<App />
					</ThemeProvider>
				</DataContextProvider>
			</BrowserRouter>
		</SnackbarProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
