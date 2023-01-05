import { Box, styled, Typography } from "@mui/material";

const Wrap = styled(Typography)(() => ({
	fontFamily: "Kanit",
	letterSpacing: 0,
}))

const Git = styled(Typography)(() => ({
	textTransform: "uppercase"
})) as typeof Typography

const Report = styled(Typography)(() => ({
	color: "#00C2FF",
	fontSize: "0.5em"
})) as typeof Typography

export default function GitReportTitle() {
	return (
		<Box>
			<Wrap variant="h1" style={{
				fontFamily: "Kanit",
				letterSpacing: 0,
			}}>
				<Git variant="h1" component="span">
					Git
				</Git>
				<Report variant="h1" component="span">
					Report
				</Report>
			</Wrap>
		</Box>
	)
}