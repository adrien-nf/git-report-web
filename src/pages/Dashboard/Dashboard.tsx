import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Stack, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';
import { ParsedProjectMap } from '../../types/ParsedProject';
import Footer from '../../components/Footer/Footer';

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	flexGrow: 1,
	overflowY: "scroll",
	padding: theme.spacing(2),
	overflowX: "hidden",
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
			maxHeight: "100vh",
			overflow: "hidden",
		}}>
			<Grid item xs={12} md={6} style={{
				backgroundColor: "rgba(0, 0, 0, 0.38)",
			}}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper>
						<Settings
							reportData={reportData}
							setReportData={setReportData}
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
						/>
					</Wrapper>
					<Footer>
						<p>Salut</p>
					</Footer>
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper>
						<Report reportData={reportData} />
					</Wrapper>
					<Footer>
						<p>Salut</p>
					</Footer>
				</Stack>
			</Grid>
		</Grid>
	);
}
