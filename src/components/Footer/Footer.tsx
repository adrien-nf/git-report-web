import { styled } from "@mui/material";
import { ReactNode } from "react";

const StyledFooter = styled(('footer'))(({ theme }) => ({
	backgroundColor: "rgba(0, 0, 0, 0.25)",
	paddingTop: theme.spacing(7),
	paddingBottom: theme.spacing(7),
	width: "100%",
	fontSize: '18px',
	paddingInline: '15px',
}))

function Footer(props: {
	children: ReactNode | ReactNode[],
} & React.HTMLAttributes<HTMLElement>) {
	return (
		<StyledFooter {...props}>
			{props.children}
		</StyledFooter>
	)
}

export default Footer;