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
							<Button variant={props.selectedProject?.name === e.name ? "contained" : "outlined"} onClick={() => props.setSelectedProject(e)}>{e.name}</Button>
							<Button onClick={() => toggleVisibility(e)}>
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