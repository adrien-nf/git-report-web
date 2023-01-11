import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';

const Wrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
}))

export default function Dashboard() {
	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
	});

	const [selectedProject, setSelectedProject] = useState<Project>()

	useEffect(() => {
		setReportData({
			projects
		})
		setSelectedProject(projects.values().next().value);
	}, [projects])

	return (
		<Grid container minHeight={"100vh"}>
			<Grid item xs={12} md={6} style={{
				backgroundColor: "rgba(0, 0, 0, 0.38)",
			}}>
				<Wrapper>
					<Settings reportData={reportData} setReportData={setReportData} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
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
