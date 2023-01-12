import { styled, Link } from "@mui/material";
import React from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Wrapper = styled(Link)(({ theme }) => ({
	fontSize: "1em",
	backgroundColor: "#101E21",
	color: "#9AE7FF",
	paddingTop: 2,
	paddingBottom: 2,
	paddingRight: 4,
	paddingLeft: 4,
	borderRadius: 4,
	cursor: "pointer",
}))

export default function LinkBadge(props: {
	text: string,
	link: string,
}) {
	return (
		<Wrapper href={props.link}>
			<OpenInNewIcon style={{
				marginRight: 2,
				fontSize: "1em",
				verticalAlign: "middle",
				display: "inline-block",
			}} /> <span style={{
				fontSize: "1em",
				verticalAlign: "middle",
				display: "inline-block",
			}}>
				{props.text}
			</span>
		</Wrapper>
	)
}