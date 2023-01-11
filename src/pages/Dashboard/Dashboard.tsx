import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';

const Wrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
}))

export default function Dashboard() {
	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
	});

	useEffect(() => {
		setReportData({
			projects
		})
	}, [projects])

	return (
		<Grid container>
			<Grid item xs={12} md={6}>
				<Wrapper>
					<Settings reportData={reportData} setReportData={setReportData} />
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
