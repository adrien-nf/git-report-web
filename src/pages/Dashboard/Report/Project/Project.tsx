import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { Project as TypeProject } from "../../../../types/Project"

const StyledUl = styled("ul")(() => ({
	marginTop: 0,
}))

export default function Project(props: {
	project: TypeProject,
}) {
	return (
		<Box>
			<Typography variant="h6" component="h1">{props.project.name}</Typography>
			<StyledUl>
				{
					props.project.commits.trim().split(/\r?\n|\r|\n/g).filter(e => e).map(e => <li>{e}</li>)
				}
			</StyledUl>
		</Box>
	)
}