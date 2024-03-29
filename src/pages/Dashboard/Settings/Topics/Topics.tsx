import { Button, ButtonGroup, Stack, styled } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Project } from "../../../../types/Project";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ReportData } from "../../../../types/ReportData";

const StyledIconButton = styled(Button)(() => ({
	backgroundColor: "#101E21",
	color: "#9AE7FF",
}));

const TopicButton = styled(Button)<{ selected: boolean }>(({ selected }) => ({
	backgroundColor: selected ? "#092D39" : "#0B1316",
	flex: '1 1',
	whiteSpace: 'nowrap',
	color: selected ? "#9AE7FF" : "white",
	':hover': {
		backgroundColor: selected ? "#092D39" : "#101E21",
	},
}));

const ButtonsContainer = styled(ButtonGroup)({
	display: 'flex',
	flex: '1 1',
});

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
			<Stack direction="row" gap="12px" flexWrap="wrap">
				{
					(Array.from(props.reportData.projects.values())).map(e => (
						<ButtonsContainer size="small" aria-label="small button group" key={e.name}>
							<TopicButton
								selected={props.selectedProject === e}
								variant="contained"
								onClick={() => props.setSelectedProject(e)}>
								{e.name}
							</TopicButton>
							<StyledIconButton variant="contained" onClick={() => toggleVisibility(e)}>
								{
									props.reportData.projects.get(e.name)!.options.shown ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)
								}
							</StyledIconButton>
						</ButtonsContainer>
					))
				}
			</Stack>
		</Stack>
	)
}