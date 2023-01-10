import React from 'react';
import { Grid } from '@mui/material';
import Report from './Report/Report';

export default function Dashboard() {
	return (
		<Grid container>
			<Grid item xs={12} md={6}></Grid>
			<Grid item xs={12} md={6}>
				<Report />
			</Grid>
		</Grid>
	);
}
