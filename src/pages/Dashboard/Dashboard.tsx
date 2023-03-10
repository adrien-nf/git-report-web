import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Stack, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';
import { ParsedProjectMap } from '../../types/ParsedProject';
import Footer from '../../components/Footer/Footer';
import GithubLink from '../../components/GithubLink/GithubLink';
import MadeBy from '../../components/MadeBy/MadeBy';
import { useNavigate } from 'react-router-dom';
import GitReportTitle from '../../components/GitReportTitle/GitReportTitle';
import CopyButtons from './Report/CopyButtons';

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	flexGrow: 1,
	overflowY: "scroll",
	overflowX: "hidden",
	'&::-webkit-scrollbar': {
		width: '0.4em',
		paddingRight: "0.1em",
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: "rgba(0, 194, 255, 0.15);",
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: theme.palette.primary.main,
	}
}));

const DashboardFooter = styled(Footer)(({ theme }) => ({
	padding: theme.spacing(3),
}));


export default function Dashboard() {
	const navigate = useNavigate();

	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
		before: "",
		after: "",
	});

	const [selectedProject, setSelectedProject] = useState<Project>()

	const generateReportDataFrom = (projects: ParsedProjectMap): ReportData => {
		const projectsToIterateOver = Array.from(projects.values());

		const reportData: ReportData = { projects: new Map(), before: "", after: "" };

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
		if (projects.size > 0) {
			setReportData(generateReportDataFrom(projects))
		} else {
			return navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projects])

	return (
		<Grid container style={{
			maxHeight: "100vh",
			overflow: "hidden",
		}}>
			<Grid item xs={12} lg={6}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper style={{
						backgroundColor: "#050b0d"
					}}>
						<Settings
							reportData={reportData}
							setReportData={setReportData}
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
						/>
					</Wrapper>
					<DashboardFooter>
						<Stack direction="row" justifyContent="space-between" paddingLeft={2}>
							<GitReportTitle style={{ marginBottom: 0 }} variant="h3" />
							<Stack textAlign="right">
								<GithubLink />
								<MadeBy />
							</Stack>
						</Stack>
					</DashboardFooter>
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper padding={3}>
						<Report reportData={reportData} />
					</Wrapper>
					<CopyButtons reportData={reportData}  />
				</Stack>
			</Grid>
		</Grid>
	);
}
