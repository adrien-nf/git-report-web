import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';

const Wrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
}))

export default function Dashboard() {
	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: []
	});

	useEffect(() => {
		setReportData({
			projects: Array.from(projects.values())
		})
	}, [projects])

	return (
		<Grid container>
			<Grid item xs={12} md={6}>
				<Wrapper>

				</Wrapper>
			</Grid>
			<Grid item xs={12} md={6}>
				<Wrapper>
					<Report reportData={reportData} />
				</Wrapper>
			</Grid>
		</Grid>
	);
}
