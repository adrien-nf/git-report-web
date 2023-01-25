import React, { Dispatch, SetStateAction } from "react";
import { Stack, Box } from "@mui/material";
import { ReportData } from "../../../types/ReportData";
import { Project } from "../../../types/Project";
import Topics from "./Topics/Topics";
import EditProject from "./EditProject/EditProject";
import EditReport from "./EditReport/EditReport";
import Filters from "./Filters/Filters";

export default function Settings(props: {
	reportData: ReportData,
	setReportData: Dispatch<SetStateAction<ReportData>>,
	selectedProject: Project | undefined,
	setSelectedProject: Dispatch<SetStateAction<Project | undefined>>,
}) {
	return (
		<Box flexGrow={1}>
			<Stack spacing={5}>
				<Filters reportData={props.reportData} setReportData={props.setReportData} selectedProject={props.selectedProject} setSelectedProject={props.setSelectedProject} />
				<Topics reportData={props.reportData} setReportData={props.setReportData} selectedProject={props.selectedProject} setSelectedProject={props.setSelectedProject} />
				<EditProject setReportData={props.setReportData} selectedProject={props.selectedProject} />
				<EditReport setReportData={props.setReportData}></EditReport>
			</Stack>
		</Box >
	)
}