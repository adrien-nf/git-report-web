import React from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ButtonBadge from "../ButtonBadge/ButtonBadge";

export default function LinkBadge(props: {
	text: string,
	link: string,
}) {
	return (
		<ButtonBadge
			startIcon={<OpenInNewIcon />}
			component="a"
			href={props.link}
			variant="contained"
		>
			{props.text}
		</ButtonBadge>
	)
}
