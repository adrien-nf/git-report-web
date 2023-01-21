import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import { ReactNode } from "react";

const StyledFooter = styled(Box)(({ theme }) => ({
	backgroundColor: "rgba(0, 0, 0, 0.25)",
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
	width: "100%"
}))


export default function Footer(props: {
	children: ReactNode | ReactNode[],
} & BoxProps) {
	return (
		<StyledFooter {...props}>
			{props.children}
		</StyledFooter>
	)
}