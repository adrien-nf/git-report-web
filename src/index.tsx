import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
