import { styled } from "@mui/material"


const StyledTitle = styled("span")(() => ({
	"&::before": {
		content: '""',
		position: "absolute",
		height: "1em",
		// TODO: Width should be inherited from parent.
		width: "30px",
		marginLeft: "-4px",
		backgroundColor: "red",
		zIndex: "-1",
	}
}))

export default function SectionTitle(props: {
	children: string
}) {
	return (
		<StyledTitle>{props.children}</StyledTitle>
	)
}