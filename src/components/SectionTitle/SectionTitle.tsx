import { Box, styled } from "@mui/material"


const StyledTitle = styled("span")(() => ({
	"&::before": {
		content: '""',
		position: "absolute",
		height: "1em",
		width: "100%",
		marginLeft: "-6px",
		backgroundColor: "rgba(0, 194, 255, 0.21)",
		borderRadius: "2px",
		zIndex: -1
	}
}))

export default function SectionTitle(props: {
	children: React.ReactNode
}) {
	return (
		<Box position="relative" width="fit-content">
			<StyledTitle>{props.children}</StyledTitle>
		</Box>
	)
}