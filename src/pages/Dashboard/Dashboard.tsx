import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
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
import CopyButtons from './Report/CopyButtons';
import { FormatAlignLeft, Tune } from '@mui/icons-material';

const DashboardGridContainer = styled(Grid)(({ theme }) => ({
	maxHeight: '100vh',
	overflow: 'hidden',
	[theme.breakpoints.down('md')]: {
		overflow: 'initial',
		maxHeight: 'initial',
	}
}));

const FullHeightGridContainer = styled(Stack)(({ theme }) => ({
	maxHeight: '100vh',
	[theme.breakpoints.down('md')]: {
		maxHeight: 'initial',
	}
}));

const GridHideOnSm = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none'
	}
}));

const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexGrow: 1,
	overflowY: 'auto',
	overflowX: 'hidden',
	'&::-webkit-scrollbar': {
		width: '0.4em',
		paddingRight: '0.1em',
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: 'rgba(0, 194, 255, 0.15);',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: theme.palette.primary.main,
	}
}));

const DashboardFooter = styled(Footer)(({ theme }) => ({
	padding: theme.spacing(3),
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexWrap: 'wrap',
	gap: '10px',
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		textAlign: 'center',
	}
}));

const MobileToggleViewButtonContainer = styled('div')(({ theme }) => ({
	display: 'none',
	position: 'fixed',
	zIndex: 2,
	bottom: 25,
	left: 35,
	background: '#071115',
	borderRadius: '10px',
	padding: '6px 10px',
	border: '1px solid #00C2FF11',
	'& > button': {
		color: "#9AE7FF",
	},
	[theme.breakpoints.down('md')]: {
		display: 'block'
	}
}));

export default function Dashboard() {
	const navigate = useNavigate();
	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down('md'));
	// Toggle view state in mobile
	const [showReport, setShowReport] = useState(false);

	const { projects } = useContext(DataContext);

	const [reportData, setReportData] = useState<ReportData>({
		projects: new Map(),
		before: '',
		after: '',
	});

	const [selectedProject, setSelectedProject] = useState<Project>()

	const generateReportDataFrom = (projects: ParsedProjectMap): ReportData => {
		const projectsToIterateOver = Array.from(projects.values());

		const reportData: ReportData = { projects: new Map(), before: '', after: '' };

		projectsToIterateOver.forEach(project => {
			const newProject: Project = {
				commits: project.commits.map(e => e.description).join('\n'),
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
			return navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projects])

	useEffect(() => {
		if (downMd) return;
		setShowReport(false);
	}, [downMd])

	return (
		<DashboardGridContainer container>
			<Grid item xs={12} md={6}>
				<FullHeightGridContainer display="flex" direction="column">
					<Wrapper sx={{ backgroundColor: '#050b0d' }}>
						{showReport ? (
							<Report reportData={reportData} />
						) : (
							<Settings
								reportData={reportData}
								setReportData={setReportData}
								selectedProject={selectedProject}
								setSelectedProject={setSelectedProject}
							/>
						)}
					</Wrapper>
					<DashboardFooter>
						<Box display="flex" gap="10px" justifyContent="center" alignItems="center">
							<GithubLink />
							<small>v{__APP_VERSION__}</small>
						</Box>
						<MadeBy />
					</DashboardFooter>
				</FullHeightGridContainer>
			</Grid>
			<GridHideOnSm item xs={12} md={6}>
				<FullHeightGridContainer>
					<Wrapper>
						<Report reportData={reportData} />
					</Wrapper>
				</FullHeightGridContainer>
			</GridHideOnSm>
			<CopyButtons reportData={reportData} />
			<MobileToggleViewButtonContainer>
				<IconButton size="large" onClick={() => setShowReport(!showReport)}>
					{showReport ? <Tune /> : <FormatAlignLeft />}
				</IconButton>
			</MobileToggleViewButtonContainer>
		</DashboardGridContainer>
	);
}
