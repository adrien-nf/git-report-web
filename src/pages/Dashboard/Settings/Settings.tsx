import { ButtonGroup, Slider, Stack, Button, Box, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ReportData } from "../../../types/ReportData";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Edit from '@mui/icons-material/Edit';
import { Project } from "../../../types/Project";

export default function Settings(props: {
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

	const [commits, setCommits] = useState("");

	useEffect(() => {
		setCommits(props.selectedProject?.commits || "");
	}, [props.selectedProject])

	useEffect(() => {
		props.setReportData(reportData => {

			if (props.selectedProject) {
				props.selectedProject.commits = commits;
			}

			const newReportData = { ...reportData }

			return newReportData;
		})
	}, [commits])

	return (
		<Stack spacing={5}>
			<Box>
				<SectionTitle>Date range</SectionTitle>
				<Slider
					getAriaLabel={() => 'Temperature range'}
					valueLabelDisplay="auto"
				/>
			</Box>
			<Box>
				<SectionTitle>Topics</SectionTitle>
				<Stack direction="row" columnGap={2} rowGap={2} flexWrap="wrap">
					{
						(Array.from(props.reportData.projects.values())).map(e => (
							<ButtonGroup size="small" aria-label="small button group" key={e.name}>
								<Button variant={props.selectedProject === e ? "contained" : "outlined"} onClick={() => props.setSelectedProject(e)}>{e.name}</Button>
								<Button onClick={() => props.setSelectedProject(e)}><Edit /></Button>
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
			</Box>
			<Box>
				<Stack>
					<SectionTitle>Items <span>{props.selectedProject?.name}</span></SectionTitle>
					<TextField label="Commits" multiline value={commits} onChange={(e) => setCommits(e.target.value)} />
				</Stack>
			</Box>
		</Stack>
	)
}