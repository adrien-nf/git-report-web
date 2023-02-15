import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { DataContextProvider } from "./contexts/DataContext/DataContext";
import { BrowserRouter } from 'react-router-dom';
import { darkTheme } from './misc/darkTheme';
import SnackContextProvider from './contexts/SnackContext/SnackContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<SnackContextProvider>
				<BrowserRouter>
					<DataContextProvider>
						<App />
					</DataContextProvider>
				</BrowserRouter>
			</SnackContextProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
