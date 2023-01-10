import { Project as TypeProject } from "../../../../types/Project"

export default function Project(props: {
	project: TypeProject,
}) {
	return (<p>{props.project.name}</p>)
}