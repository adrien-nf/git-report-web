import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import Report from './Report/Report';

const Wrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
}))

export default function Dashboard() {
	return (
		<Grid container>
			<Grid item xs={12} md={6}>
				<Wrapper>

				</Wrapper>
			</Grid>
			<Grid item xs={12} md={6}>
				<Wrapper>
					<Report />
				</Wrapper>
			</Grid>
		</Grid>
	);
}
