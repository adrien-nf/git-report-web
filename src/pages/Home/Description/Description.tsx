import { Stack, Grid } from "@mui/material";
import GitReportTitle from "../../../components/GitReportTitle/GitReportTitle";
import SubTitle from "../SubTitle/SubTitle";
import LogoMute from "../../../assets/LogoMute.svg";

export default function Description() {
	return (
		<Stack direction="row">
			<Grid container columnSpacing={18} rowSpacing={2}>
				<Grid item xs={12} md={6}>
					<GitReportTitle />
					<SubTitle>Introducing a new way to analyze and report your Git activity. With our command-line script, you can quickly generate detailed reports of your commits. Easily see what you worked on and how much time you spent on it!</SubTitle>
				</Grid>
				<Grid item display={{ xs: "none", "md": "block" }} md={6}>
					<img src={LogoMute} style={{
						userSelect: "none",
						MozUserSelect: "none",
						WebkitUserSelect: "none",
						display: 'block',
						marginLeft: 'auto'
					}} draggable="false" alt="Logo GitReport" />
				</Grid>
			</Grid>
		</Stack>
	)
}