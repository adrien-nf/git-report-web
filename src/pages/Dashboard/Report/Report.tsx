import { Stack } from "@mui/material";
import Project from "./Project/Project";
import { Project as TypeProject } from "../../../types/Project";
import { ReportData } from "../../../types/ReportData";

export default function Report(props: {
	reportData: ReportData,
}) {
	return (
		<Stack spacing={2}>
			{
				(Array.from(props.reportData.projects.values(), ((project: TypeProject) => <Project project={project} />)))
			}
		</Stack>
	)
}