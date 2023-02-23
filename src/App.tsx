import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import StartAnimation from './pages/Home/StartAnimation';

export default function App() {
	return (
		<Routes>
			<Route element={<StartAnimation />}>
				<Route path="/" element={<Home />}></Route>
				<Route path="/report" element={<Dashboard />}></Route>
			</Route>
		</Routes>
	);
}
