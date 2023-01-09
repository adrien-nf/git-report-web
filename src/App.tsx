import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/report" element={<Dashboard />}></Route>
		</Routes>
	);
}
