import { Stack, styled, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Project } from "../../../../types/Project";
import { ReportData } from "../../../../types/ReportData";

const EditProjectTitle = styled(SectionTitle)(() => ({
	'&::before': {
		width: '54px',
	},
	'& > span': {
		fontSize: '16px',
	}
}))

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
			<EditProjectTitle>Items <span>[{props.selectedProject?.name}]</span></EditProjectTitle>
			<TextField label="Commits" multiline value={commits} onChange={(e) => setCommits(e.target.value)} />
		</Stack>
	)
}