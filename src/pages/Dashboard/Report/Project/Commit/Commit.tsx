import { Commit as TypeCommit } from "../../../../../types/Commit"

export default function Project(props: {
	commit: TypeCommit,
}) {
	return (<p>{props.commit.description}</p>)
}