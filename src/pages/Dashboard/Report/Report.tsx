import { Stack, styled } from "@mui/material";
import Project from "./Project/Project";
import { Project as TypeProject } from "../../../types/Project";
import { ReportData } from "../../../types/ReportData";

const SpacedSpan = styled("span")(() => ({
	whiteSpace: "pre-wrap",
	wordWrap: "break-word"
}))

export default function Report(props: {
	reportData: ReportData,
}) {
	return (
		<Stack spacing={2} padding={3}>
			{
				props.reportData.before && (
					<SpacedSpan style={{
						whiteSpace: "pre-wrap",
						wordWrap: "break-word"
					}}>
						{
							props.reportData.before.trim()
						}
					</SpacedSpan>
				)
			}
			{
				(Array.from(props.reportData.projects.values()))
					.filter(project => project.options.shown)
					.map((project: TypeProject) => <Project key={project.name} project={project} />)
			}
			{
				props.reportData.after && (
					<SpacedSpan>
						{
							props.reportData.after
						}
					</SpacedSpan>
				)
			}
		</Stack>
	)
}