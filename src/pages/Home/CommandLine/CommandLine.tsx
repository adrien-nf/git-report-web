import { CircularProgress, IconButton, Stack, styled, Switch, Typography } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import { DataContext } from "../../../contexts/DataContext/DataContext"
import ThatsYou from "../../../assets/ThatsYou.svg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LinkBadge from "../../../components/LinkBadge/LinkBadge";
import { useScriptUrl } from "../../../contexts/ScriptUrlContext/ScriptUrlContext";
import { ContentCopy } from "@mui/icons-material";

const BlackPaperWithoutThatsYou = styled('div')(({ theme }) => ({
	background: 'rgba(0, 0, 0, 0.42)',
	backdropFilter: 'blur(2px)',
	borderRadius: 2,
	padding: theme.spacing(3),
	fontSize: '18px',
	fontFamily: '\'Ubuntu Mono\', monospace',
	display: 'flex',
	alignItems: 'center',
	justifyContent : 'space-between',
	gap: '15px',
	flexWrap: 'wrap',
	'& > span': {
		position: 'relative',
		wordBreak: 'break-all',
	},
	'& > span::before': {
		content: '"$"',
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.main,
	},
}));

const BlackPaper = styled(BlackPaperWithoutThatsYou)(() => ({
	'& > span::after': {
		content: `url(${ThatsYou})`,
		fontFamily: "Caveat",
		fontSize: "1.5em",
		bottom: -55,
		right: 20,
		position: "absolute",
	}
}));

const ModeSwitch = styled(Switch)(({ theme }) => ({
	width: 50,
	height: 25,
	padding: 0,
	display: 'flex',
	'& .MuiSwitch-switchBase': {
		padding: 0,
		color: '#006788',
		'& + .MuiSwitch-track': {
			opacity: 1,
			backgroundColor: '#12292F'
		},
		'&.Mui-checked': {
			transform: 'translateX(25px)',
			color: '#00C2FF',
		},
	},
	'& .MuiSwitch-thumb': {
		width: 25,
		height: 25,
		borderRadius: '50%',
	},
	'& .MuiSwitch-track': {
		borderRadius: 25 / 2,
		opacity: 1,
		backgroundColor:
			theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
		boxSizing: 'border-box',
	},
}));

export default function CommandLine() {
	const { isError, isLoading } = useContext(DataContext);
	const { isAutomatic, setIsAutomatic, fullUrl } = useScriptUrl();

	return (
		<section id="script">
			<Stack
				marginBottom="25px"
				justifyContent="space-between"
				direction={{ xs: 'column', sm: 'row' }}
				alignItems={{ xs: 'start', sm: 'end' }}
				gap="25px"
			>
				<SectionTitle style={{ marginBottom: 0 }}>Get started now !</SectionTitle>
				<Stack
					direction="row"
					gap={{ xs: '15px', sm: '25px' }}
				>
					{(!isError && !isLoading) && (
						<Stack direction="row" alignItems="center" gap="10px">
							<ModeSwitch id="autoSwitch" checked={isAutomatic} onChange={(event) => setIsAutomatic(event.target.checked)} />
							<Typography htmlFor="autoSwitch" color="#E0E0E0" component="label">Automatic</Typography>
						</Stack>
					)}
					<LinkBadge text="Show the full script" link={fullUrl} />
				</Stack>
			</Stack>
			{
				<LoadingOrScript />
			}
		</section>
	)
}

const LoadingOrScript = () => {
	const { isLoading } = useContext(DataContext);

	return isLoading ? (
		<CircularProgress style={{ alignSelf: "center" }} />
	) : (
		<AutomaticOrStatic />
	);
}

const AutomaticOrStatic = () => {
	const { baseUrl, identifier, handleCopy } = useScriptUrl();
	const cleanUrl = baseUrl.replace(/http.?:\/\//g, "");
	const DynamicBlackPaper = identifier === "static" ? BlackPaperWithoutThatsYou : BlackPaper;

	return (
		<DynamicBlackPaper>
			<span>
				sh -c "$(curl -fsSL {cleanUrl}
				<span style={{ color: "#9AE7FF" }}>
					{identifier}
				</span>
				)"
			</span>
			<IconButton onClick={handleCopy} color="primary">
				<ContentCopy />
			</IconButton>
		</DynamicBlackPaper>
	);
}