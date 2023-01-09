import { Paper, styled } from "@mui/material"
import { useContext } from "react"
import { DataContext } from "../../../contexts/DataContext/DataContext"

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
		fontSize: "1.5em",
		transform: "rotate(-3.47deg)",
		marginTop: "1em",
		marginLeft: "-3em",
		position: "absolute",
	}
}))

export default function CommandLine() {
	const { eventId } = useContext(DataContext);

	return (
		<BlackPaper>
			<span>sh -c "$(curl -fsSL https://flash.vps.webdock.cloud/api/script/<span style={{ color: "#9AE7FF" }}>{eventId}</span>)"</span>
		</BlackPaper>
	)
}

