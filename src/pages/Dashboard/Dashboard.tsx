import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, styled } from '@mui/material';
import Report from './Report/Report';
import { DataContext } from '../../contexts/DataContext/DataContext';
import { ReportData } from '../../types/ReportData';
import Settings from './Settings/Settings';
import { Project } from '../../types/Project';
import { ParsedProjectMap } from '../../types/ParsedProject';
import Footer from '../../components/Footer/Footer';
import { ExporterFactory } from '../../services/Exporter/ExporterFactory';
import { ExportType } from '../../services/Exporter/ExportType';
import GithubLink from '../../components/GithubLink/GithubLink';
import MadeBy from '../../components/MadeBy/MadeBy';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ValidationTooltip from '../../components/ValidationTooltip/ValidationTooltip';

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
	const navigate = useNavigate();

	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
		before: "",
		after: "",
	});

	const [selectedProject, setSelectedProject] = useState<Project>()

	const [isExported, setIsExported] = useState(false);

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

	const exportAs = (as: ExportType) => {
		(ExporterFactory.generate(as).export(reportData))
		setIsExported(true);
	}

	return (
		<Grid container style={{
			maxHeight: "100vh",
			overflow: "hidden",
		}}>
			<Grid item xs={12} lg={6}>
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
						<Stack direction="row" justifyContent="space-between">
							<Box>
								{/* TODO: Logo here */}
							</Box>
							<Stack textAlign="right">
								<GithubLink />
								<MadeBy />
							</Stack>
						</Stack>
					</Footer>
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<Stack display="flex" direction="column" height="100vh">
					<Wrapper>
						<Report reportData={reportData} />
					</Wrapper>
					<Footer>
						<Stack direction="row-reverse" gap={2} paddingRight={2}>
							<ValidationTooltip isValidated={isExported} setIsValidated={setIsExported} validatedTitle="Copied" notValidatedTitle="Copy to Text">
								<Button onClick={() => exportAs(ExportType.Text)}><AssignmentIcon /></Button>
							</ValidationTooltip>
							<ValidationTooltip isValidated={isExported} setIsValidated={setIsExported} validatedTitle="Copied" notValidatedTitle="Copy to Html">
								<Button onClick={() => exportAs(ExportType.Html)}><IntegrationInstructionsIcon /></Button>
							</ValidationTooltip>
						</Stack>
					</Footer>
				</Stack>
			</Grid>
		</Grid>
	);
}
