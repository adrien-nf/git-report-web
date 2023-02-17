import { Box, styled, Typography } from "@mui/material"


const StyledTitle = styled(Typography)(() => ({
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
	children: React.ReactNode,
} & React.HTMLAttributes<HTMLTitleElement>) {
	return (
		<Box position="relative" width="fit-content">
			<StyledTitle variant="h2" {...props}>
				{props.children}
			</StyledTitle>
		</Box>
	)
}