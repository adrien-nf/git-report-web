import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';
import { ParsedProjectMap } from '../../types/ParsedProject';

const Wrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
}))

export default function Dashboard() {
	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
	});

	const [selectedProject, setSelectedProject] = useState<Project>()

	const generateReportDataFrom = (projects: ParsedProjectMap): ReportData => {
		const projectsToIterateOver = Array.from(projects.values());

		const reportData: ReportData = { projects: new Map() };

		projectsToIterateOver.forEach(project => {
			const newProject: Project = {
				commits: project.commits.map(e => e.description).join("\n"),
				name: project.name,
				options: {
					shown: true
				}
			}
			reportData.projects.set(project.name, newProject)
		})

		setSelectedProject(reportData.projects.values().next().value);

		return reportData;
	}

	useEffect(() => {
		setReportData(generateReportDataFrom(projects))
	}, [projects])

	return (
		<Grid container style={{
			height: "100vh",
		}}>
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
