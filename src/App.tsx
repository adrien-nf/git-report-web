import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />}></Route>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	);
}
