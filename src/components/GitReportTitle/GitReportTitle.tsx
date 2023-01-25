import { Box, styled, Typography, TypographyTypeMap } from "@mui/material";

const Wrap = styled(Typography)(() => ({
	fontFamily: "Kanit",
	letterSpacing: 0,
}))

const Git = styled(Typography)(() => ({
	textTransform: "uppercase",
})) as typeof Typography

const Report = styled(Typography)(() => ({
	color: "#00C2FF",
	fontSize: "0.5em"
})) as typeof Typography

GitReportTitle.defaultProps = {
	variant: "h1"
}

export default function GitReportTitle(props: {
	variant: TypographyTypeMap["props"]["variant"]
}) {
	return (
		<Box>
			<Wrap variant={props.variant} style={{
				fontFamily: "Kanit",
				letterSpacing: 0,
			}}>
				<Git variant={props.variant} component="span">
					Git
				</Git>
				<Report variant={props.variant} component="span">
					Report
				</Report>
			</Wrap>
		</Box>
	)
}