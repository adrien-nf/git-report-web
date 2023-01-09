import { Paper, styled } from "@mui/material"

const BlackPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.common.black,
	borderRadius: 2,
	padding: theme.spacing(2),
	"&::before": {
		content: '"$"',
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(1),
		color: "#00C2FF"
	},
	"&::after": {
		content: '"That\'s you"',
		fontFamily: "Caveat",
		marginTop: "30px",
		marginLeft: "4em",
		position: "absolute",
		"&::before": {
			content: '"sa"',
			backgroundColor: "red",
		}
	}
}))

export default function CommandLine(props: {
	children: React.ReactNode
}) {
	return (
		<BlackPaper>
			<span>{props.children}</span>
		</BlackPaper>
	)
}

