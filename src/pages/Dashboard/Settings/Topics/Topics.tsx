import { Button, ButtonGroup, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Project } from "../../../../types/Project";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ReportData } from "../../../../types/ReportData";

export default function Topics(props: {
	reportData: ReportData,
	setReportData: Dispatch<SetStateAction<ReportData>>,
	selectedProject: Project | undefined,
	setSelectedProject: Dispatch<SetStateAction<Project | undefined>>,
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
			<SectionTitle>Topics</SectionTitle>
			<Stack direction="row" columnGap={2} rowGap={2} flexWrap="wrap">
				{
					(Array.from(props.reportData.projects.values())).map(e => (
						<ButtonGroup size="small" aria-label="small button group" key={e.name}>
							<Button style={{
								backgroundColor: props.selectedProject === e ? "#092D39" : "#0B1316",
								color: props.selectedProject === e ? "#9AE7FF" : "white",
							}} variant="contained" onClick={() => props.setSelectedProject(e)}>{e.name}</Button>
							<Button style={{
								backgroundColor: "#101E21",
								color: "#9AE7FF",
								border: 0,
							}} onClick={() => toggleVisibility(e)}>
								{
									props.reportData.projects.get(e.name)!.options.shown ? (
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
		</Stack>
	)
}