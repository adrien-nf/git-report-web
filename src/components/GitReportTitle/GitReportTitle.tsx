import { Box, styled, Typography, TypographyTypeMap } from "@mui/material";

const Git = styled(Typography)(() => ({
	textTransform: "uppercase",
})) as typeof Typography

const Report = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.main,
	fontSize: "0.5em"
})) as typeof Typography

GitReportTitle.defaultProps = {
	variant: "h1"
}

export default function GitReportTitle(props: {
	variant: TypographyTypeMap["props"]["variant"],
	noMargin?: boolean,
}) {
	return (
		<Box marginBottom={props.noMargin ? 0 : 3}>
			<Typography variant={props.variant} style={{
				fontFamily: "Kanit",
				letterSpacing: 0,
			}}>
				<Git variant={props.variant} component="span">
					Git
				</Git>
				<Report variant={props.variant} component="span">
					Report
				</Report>
			</Typography>
		</Box>
	)
}