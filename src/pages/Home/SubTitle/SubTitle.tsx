import { Typography } from "@mui/material";

export default function SubTitle(props: {
	children: string
}) {
	return (
		<Typography fontSize="18px">{props.children}</Typography>
	)
}