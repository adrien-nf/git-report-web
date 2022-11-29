import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress, Paper } from '@mui/material';
import { Container } from '@mui/system';
import Navbar from './components/Navbar';
import { Step } from './enums/Step';
import { AnyMessage } from './interfaces/MessageType';

export default function App() {

	const [step, setStep] = useState(Step.HELP)

	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState(null);

	useEffect(() => {
		const sse = new EventSource("http://localhost:8000");

		sse.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data) as AnyMessage;

			console.log(data)

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
		<Box>
			<Navbar></Navbar>

			<Container maxWidth="md" style={{
				marginTop: 16
			}}>
				<Paper elevation={3} style={{
					flexGrow: 1,
					padding: 8
				}}>
					<Typography variant="h1">
						Auto Report
					</Typography>

					<StepDisplayer step={step} />
				</Paper>
			</Container>


		</Box>
	);
}

const StepDisplayer = (props: {
	step: Step
}) => {
	if (props.step === Step.HELP) {
		return <Help />
	}

	if (props.step === Step.LOADER) {
		return <CircularProgress />
	}

	if (props.step === Step.REPORT) {
		return <Report />
	}

	return <Help />
}

const Help = () => {
	return (
		<h1>Help</h1>
	)
}

const Report = () => {
	return (
		<h1>Report</h1>
	)
}