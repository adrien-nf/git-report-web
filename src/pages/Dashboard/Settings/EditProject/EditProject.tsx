import { Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Project } from "../../../../types/Project";
import { ReportData } from "../../../../types/ReportData";

export default function EditProject(props: {
	selectedProject: Project | undefined,
	setReportData: Dispatch<SetStateAction<ReportData>>,
}) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commits])


	return (
		<Stack>
			<SectionTitle>Items <span>{props.selectedProject?.name}</span></SectionTitle>
			<TextField label="Commits" multiline value={commits} onChange={(e) => setCommits(e.target.value)} />
		</Stack>
	)
}