import { Box, Stack, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
	background: "rgba(0, 209, 255, 0.03)",
	flexGrow: 1,
	padding: theme.spacing(2),
}))

const StepTitle = styled(Stack)(() => ({
	fontSize: '20px',
	fontFamily: '\'Kanit\', sans-serif',
	lineHeight: '1',
	marginBottom: '10px'
}));

const StepNumber = styled('span')(() => ({
	color: "#09C4FF",
	fontWeight: "bold",
	fontSize: '24px',
}))

export default function Step(props: {
	children: React.ReactNode,
	number: number,
	title: string,
}) {
	return (
		<StyledBox>
			<StepTitle direction="row" spacing={1} alignItems="center">
				<StepNumber>#{props.number}</StepNumber>
				<span>-</span>
				<span>{props.title}</span>
			</StepTitle>
			{props.children}
		</StyledBox>
	)
}