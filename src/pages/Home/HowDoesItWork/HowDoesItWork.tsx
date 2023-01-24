import { Stack, Grid, Box } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Step from '../Step/Step';

export default function HowDoesItWork() {
	return (
		<Stack direction="column" spacing={2}>
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
	)
}