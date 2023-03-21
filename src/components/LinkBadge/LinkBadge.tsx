import React from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from "@mui/material";

export default function LinkBadge(props: {
	text: string,
	link: string,
}) {
	return (
		<Button
			startIcon={<OpenInNewIcon />}
			component="a"
			target="_blank"
			rel="noreferrer"
			href={props.link}
			variant="contained"
		>
			{props.text}
		</Button>
	)
}
