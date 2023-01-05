import { Typography } from "@mui/material";

export default function SubTitle(props: {
	children: string
}) {
	return (
		<Typography>{props.children}</Typography>
	)
}