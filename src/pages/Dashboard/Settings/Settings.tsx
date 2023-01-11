import { ButtonGroup, Slider, Stack, Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ReportData } from "../../../types/ReportData";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Edit from '@mui/icons-material/Edit';
import { Project } from "../../../types/Project";

export default function Settings(props: {
	reportData: ReportData,
	setReportData: Dispatch<SetStateAction<ReportData>>
}) {
	const toggleVisibility = (project: Project) => {
		props.setReportData(reportData => {
			project.options.shown = !project.options.shown;

			const newReportData = { ...reportData }

			return newReportData;
		})
	}

	return (
		<Stack>
			<SectionTitle>Date range</SectionTitle>
			<Slider
				getAriaLabel={() => 'Temperature range'}
				valueLabelDisplay="auto"
			/>
			<SectionTitle>Topics</SectionTitle>
			<Stack direction="row" columnGap={2} rowGap={2} flexWrap="wrap">
				{
					(Array.from(props.reportData.projects.values())).map(e => (
						<ButtonGroup size="small" aria-label="small button group" key={e.name}>
							<Button>{e.name}</Button>
							<Button><Edit /></Button>
							<Button onClick={() => toggleVisibility(e)}>
								{
									e.options.shown ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)
								}
							</Button>
						</ButtonGroup>
					))
				}
			</Stack>
			<SectionTitle>Items</SectionTitle>
		</Stack>
	)
}