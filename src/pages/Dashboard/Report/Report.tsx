import { Stack } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext/DataContext";
import Project from "./Project/Project";
import { Project as TypeProject } from "../../../types/Project";

export default function Report() {
	const { reportData } = useContext(DataContext);

	return (
		<Stack spacing={2}>
			{
				(Array.from(reportData.projects.values(), (project: TypeProject) => <Project project={project} />))
			}
		</Stack>
	)
}