import { styled } from "@mui/material"


const StyledTitle = styled("span")(() => ({
	"&::before": {
		content: '""',
		position: "absolute",
		height: "1em",
		// TODO: Width should be inherited from parent.
		width: "30px",
		marginLeft: "-6px",
		backgroundColor: "rgba(0, 194, 255, 0.21)",
		zIndex: "-1",
		borderRadius: "2px",
	}
}))

export default function SectionTitle(props: {
	children: string
}) {
	return (
		<StyledTitle>{props.children}</StyledTitle>
	)
}