import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Link, Skeleton, Stack, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import GitReportTitle from './GitReportTitle/GitReportTitle';
import SubTitle from './SubTitle/SubTitle';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import CommandLine from './CommandLine/CommandLine';
import Step from './Step/Step';
import GitHubIcon from '@mui/icons-material/GitHub';

const BoxContainer = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(7),
	paddingBottom: theme.spacing(7),
}))

const Footer = styled(Box)(({ theme }) => ({
	backgroundColor: "rgba(0, 0, 0, 0.25)",
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
	textAlign: "center",
	width: "100%"
}))

export default function Home() {
	return (
		<React.Fragment>
			<BoxContainer>
				<Container>
					<Stack direction="column" spacing={8}>
						<Stack direction="row">
							<Grid container columnSpacing={18} rowSpacing={2}>
								<Grid item xs={12} md={6}>
									<GitReportTitle />
									<SubTitle>Introducing a new way to analyze and report your Git activity. With our command-line script, you can quickly generate detailed reports of your commits. Easily see what you worked on and how much time you spent on it!</SubTitle>
								</Grid>
								<Grid item xs={12} md={6}>
									<Skeleton variant="text" width="33%" sx={{ fontSize: '1rem' }} />
									<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
									<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
									<Skeleton variant="text" width="33%" sx={{ fontSize: '1rem' }} />
									<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
									<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								</Grid>
							</Grid>
						</Stack>
						<Stack spacing={2}>
							<CommandLine />
						</Stack>
						<Stack spacing={2}>
							<SectionTitle>How does it work?</SectionTitle>
							<Box>
								<Grid container columnSpacing={12} rowSpacing={2}>
									<Grid item xs={12} md={4}>
										<Step number={1} title="Execute the script">It will parse your local commits and send them to the navigator</Step>
									</Grid>
									<Grid item xs={12} md={4}>
										<Step number={2} title="Configure your report">Manage the time range, desired directories and layout of the report</Step>
									</Grid>
									<Grid item xs={12} md={4}>
										<Step number={3} title="Generate it">Choose the format that suits you. Markdown, pdf or simply text.</Step>
									</Grid>
								</Grid>
							</Box>
						</Stack>
						<Stack spacing={2}>
							<SectionTitle>Watch it in action!</SectionTitle>
							<iframe
								src="https://www.youtube.com/embed/wnhvanMdx4s"
								style={{ border: 0, aspectRatio: 16 / 9 }}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen></iframe>
						</Stack>
					</Stack>
				</Container>
			</BoxContainer>
			<Footer>
				<Box component="div">
					<Link href="https://github.com/adrien-nf/git-report-web" target="_blank" >
						<GitHubIcon style={{
							verticalAlign: "middle",
							display: "inline-block",
							fontSize: "1.25em"
						}} /> <span style={{
							verticalAlign: "text-top",
							display: "inline-block"
						}}>Git Report</span>
					</Link>
				</Box>
				<Typography component="div">Made by <Link href="https://github.com/adrien-nf" target="_blank">Adrien NETO FERREIRA</Link> & <Link href="https://github.com/nathangobinet/" target="_blank">Nathan GOBINET</Link></Typography>
			</Footer>
		</React.Fragment >
	);
}
