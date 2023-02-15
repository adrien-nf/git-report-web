import { Button, styled } from "@mui/material";

export default styled(Button)(() => ({
	backgroundColor: "#101E21",
	color: "#9AE7FF",
	':hover': {
		backgroundColor: '#9AE7FF25',
	},
})) as typeof Button;