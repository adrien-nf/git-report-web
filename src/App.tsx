import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Grid, Paper, Skeleton, Stack, styled } from '@mui/material';
import { Container } from '@mui/system';
import { Step } from './enums/Step';
import { AnyMessage } from './interfaces/MessageType';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import GitReportTitle from './components/GitReportTitle/GitReportTitle';
import SubTitle from './components/SubTitle/SubTitle';
import SectionTitle from './components/SectionTitle/SectionTitle';

const BoxContainer = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(5)
}))


export default function App() {

	const [step, setStep] = useState(Step.HELP)

	useEffect(() => {
		const sse = new EventSource("http://localhost:8000");

		sse.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data) as AnyMessage;

			if (data.type === "received") {
				setStep(Step.LOADER)
			}

			if (data.type === "report") {
				setStep(Step.REPORT);
			}
		}

		sse.onerror = (e) => {
			console.log(e)

			sse.close();
		}

		return () => {
			sse.close();
		};
	}, []);

	return (
		<BoxContainer>
			<Container>
				<Stack direction="column" spacing={8}>
					<Stack direction="row">
						<Grid container spacing={18}>
							<Grid item xs={6}>
								<GitReportTitle />
								<SubTitle>Introducing a new way to analyze and report your Git activity. With our command-line script, you can quickly generate detailed reports of your commits. Easily see what you worked on and how much time you spent on it!</SubTitle>
							</Grid>
							<Grid item xs={6}>
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							</Grid>
						</Grid>
					</Stack>
					<Box>
						<SectionTitle>Salut</SectionTitle>
					</Box>
					<Paper elevation={3} style={{
						flexGrow: 1,
						padding: 8
					}}>
						<StepDisplayer step={step} />
					</Paper>
				</Stack>
			</Container>
		</BoxContainer>
	);
}

const StepDisplayer = (props: {
	step: Step
}) => {
	if (props.step === Step.HELP) {
		return <Help />
	}

	if (props.step === Step.LOADER) {
		return <CircularProgress style={{
			alignSelf: "center"
		}} />
	}

	if (props.step === Step.REPORT) {
		return <Report />
	}

	return <Help />
}

const Help = () => {
	const codeString = `#!/bin/sh
rm ./commits.csv 2>/dev/null && echo "Deleted old ./commits.csv"
USERNAME=$(git config user.name);
find . -name ".git" | while read fname; do
REPO=$(echo $fname | rev | cut -d'/' -f 2 | rev);
git -C $fname --no-pager log --committer="$USERNAME" --pretty=format:"$REPO;%H,%ad;%s;%b;" >> ./commits.csv
done
echo "Commits writed in ./commits.csv";
`;

	return (
		<Box>
			<SyntaxHighlighter language="bash" style={docco}>
				{codeString}
			</SyntaxHighlighter>
		</Box>
	)
}

const Report = () => {
	return (
		<h1>Report</h1>
	)
}