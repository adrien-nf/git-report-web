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
					props.project.commits.map(e => <li>{e.description}</li>)
				}
			</StyledUl>
		</Box>
	)
}