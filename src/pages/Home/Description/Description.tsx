import { ArrowDownward, ContentCopy } from "@mui/icons-material";
import { Stack, Grid, Typography, Button, styled } from "@mui/material";
import { useScriptUrl } from "../../../contexts/ScriptUrlContext/ScriptUrlContext";
import { useSnack } from "../../../contexts/SnackContext/SnackContext";
import AnimatedLogo from "./AnimatedLogo";
import GradientBackground from "./GradientBackground";

const TitleSection = styled('div')(({ theme }) => ({
	'& > h1 > span': {
		color: theme.palette.primary.main,
		position: 'relative',
		fontWeight: 400,
		'&::after': {
			content: '""',
			position: "absolute",
			top: 20,
			left: 0,
			height: ".6em",
			width: "100%",
			marginLeft: "-6px",
			backgroundColor: "rgba(0, 194, 255, 0.21)",
			borderRadius: "2px",
			zIndex: -1
		}
	},
	'& > p': {
		fontSize: '18px',
	},
	marginBottom: '95px',
	marginTop: '10px',
	[theme.breakpoints.down('sm')]: {
		marginBottom: '55px'
	}
}));

const CallButtons = styled('div')(({ theme }) => ({
	display: 'flex',
	gap: '20px',
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'column',
		gap: '15px',
	}
}))

export default function Description() {
	const { handleCopy } = useScriptUrl();

	return (
		<Stack marginBottom={{ md: '50px' }} direction="row">
			<Grid container columnSpacing={18} rowSpacing={2}>
				<Grid item xs={12} md={6}>
					<TitleSection>
						<Typography variant="h1">The fastest <span>report creator</span>, right from your commits.</Typography>
						<Typography>With our command-line script, you can quickly generate detailed reports of your commits. Easily see what you worked on and how much time you spent on it!</Typography>
					</TitleSection>
					<CallButtons>
						<Button component="a" href="#how-it-works" startIcon={<ArrowDownward />} color="primary">How it works</Button>
						<Button onClick={handleCopy} startIcon={<ContentCopy />} color="secondary">Copy the script</Button>
					</CallButtons>
				</Grid>
				<Grid item md={6}>
					<GradientBackground />
					<AnimatedLogo />
				</Grid>
			</Grid>
		</Stack>
	)
}