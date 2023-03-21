import { Box, styled, Typography } from "@mui/material"


const StyledTitle = styled(Typography)(() => ({
	marginLeft: '6px',
	"&::before": {
		content: '""',
		position: "absolute",
		height: ".7em",
		width: "95%",
		top: 4,
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
		<Box position="relative" width="fit-content" zIndex={0}>
			<StyledTitle variant="h2" {...props}>
				{props.children}
			</StyledTitle>
		</Box>
	)
}