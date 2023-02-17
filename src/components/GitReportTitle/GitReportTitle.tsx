import { styled, Typography, TypographyTypeMap } from "@mui/material";

const Wrap = styled(Typography)(() => ({
	fontFamily: "Kanit",
	letterSpacing: 0,
}))

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
} & React.HTMLAttributes<HTMLTitleElement>) {
	const style = {
		...props.style,
		fontFamily: "Kanit",
		letterSpacing: 0,
	};

	return (
		<Wrap {...props} style={style}>
			<Git variant={props.variant} component="span">
				Git
			</Git>
			<Report variant={props.variant} component="span">
				Report
			</Report>
		</Wrap>
	)
}