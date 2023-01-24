import { Box, Stack, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
	background: "rgba(0, 209, 255, 0.03)",
	flexGrow: 1,
	padding: theme.spacing(2),
}))

const StepNumber = styled(Typography)(() => ({
	color: "#09C4FF",
	fontWeight: "bold",
}))

export default function Step(props: {
	children: React.ReactNode,
	number: number,
	title: string,
}) {
	return (
		<StyledBox>
			<Stack direction="row" spacing={1}>
				<StepNumber>#{props.number}</StepNumber>
				<Typography>-</Typography>
				<Typography>{props.title}</Typography>
			</Stack>
			{props.children}
		</StyledBox>
	)
}