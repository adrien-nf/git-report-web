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
				(Array.from(props.reportData.projects.values()))
					.filter(project => project.options.shown)
					.map((project: TypeProject) => <Project key={project.name} project={project} />)
			}
		</Stack>
	)
}