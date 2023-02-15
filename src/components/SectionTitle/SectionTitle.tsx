import { Box, styled, Typography } from "@mui/material"


const StyledTitle = styled(Typography)<{ noMargin?: boolean }>(({ noMargin }) => ({
	...(noMargin && { marginBottom: 0 }),
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
	noMargin?: boolean,
	className?: string,
}) {
	return (
		<Box position="relative" width="fit-content">
			<StyledTitle className={props.className} variant="h2" noMargin={props.noMargin}>
				{props.children}
			</StyledTitle>
		</Box>
	)
}