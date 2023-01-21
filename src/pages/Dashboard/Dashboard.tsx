import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';
import { ParsedProjectMap } from '../../types/ParsedProject';
import Footer from '../../components/Footer/Footer';
import { ExporterFactory, ExportType } from '../../services/Exporter/ExporterFactory';

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	flexGrow: 1,
	overflowY: "scroll",
	padding: theme.spacing(2),
	overflowX: "hidden",
	'&::-webkit-scrollbar': {
		width: '0.4em',
		paddingRight: "0.1em",
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: "rgba(0, 194, 255, 0.15);",
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#00C2FF',
	}
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

	const exportAs = (as: ExportType) => {
		(ExporterFactory.generate(as).export(reportData))
	}

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
					</Footer>
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper>
						<Report reportData={reportData} />
					</Wrapper>
					<Footer>
						<Stack direction="row-reverse">
							<Button onClick={() => exportAs("text")}>To Text</Button>
							<Button onClick={() => exportAs("html")}>To HTML</Button>
						</Stack>
					</Footer>
				</Stack>
			</Grid>
		</Grid>
	);
}
