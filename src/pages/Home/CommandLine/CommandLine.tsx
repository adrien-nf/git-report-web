import { CircularProgress, Stack, styled, Switch, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { DataContext } from "../../../contexts/DataContext/DataContext"
import ThatsYou from "../../../assets/ThatsYou.svg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LinkBadge from "../../../components/LinkBadge/LinkBadge";
import ValidationTooltip from "../../../components/ValidationTooltip/ValidationTooltip";

const BlackPaperWithoutThatsYou = styled('div')(({ theme }) => ({
	background: 'rgba(0, 0, 0, 0.42)',
	backdropFilter: 'blur(2px)',
	borderRadius: 2,
	padding: theme.spacing(3),
	cursor: "pointer",
	fontSize: "18px",
	fontFamily: '\'Ubuntu Mono\', monospace',
	"&::before": {
		content: '"$"',
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.main
	},
}));

const BlackPaper = styled(BlackPaperWithoutThatsYou)(() => ({
	"&::after": {
		content: `url(${ThatsYou})`,
		fontFamily: "Caveat",
		fontSize: "1.5em",
		transform: "rotate(-3.47deg)",
		marginTop: "1em",
		marginLeft: "-5em",
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
	const { eventId, isError, isLoading } = useContext(DataContext);

	const [isAutomatic, setIsAutomatic] = useState(true);

	const getEventId = () => (isError || !isAutomatic) ? "static" : eventId!;

	const getUrl = (): string => {
		return window.location.href + "api/script/";
	}

	const getFullUrl = (): string => {
		return window.location.href + "api/script/" + getEventId();
	}

	return (
		<section id="script">
			<Stack
				marginBottom="25px"
				justifyContent="space-between"
				direction={{
					xs: "column",
					sm: "row"
				}}
				alignItems="center"
			>
				<SectionTitle style={{ marginBottom: 0 }}>Get started now !</SectionTitle>
				{(!isError && !isLoading) && (
					<Stack direction="row" alignItems="center" gap="10px">
						<Typography color="#E0E0E0" variant="body1">Manual</Typography>
						<ModeSwitch value={isAutomatic} onChange={(event) => setIsAutomatic(event.target.checked)} defaultChecked />
						<Typography color="#E0E0E0" variant="body1">Automatic</Typography>
					</Stack>
				)}
				<LinkBadge text="Show the full script" link={getFullUrl()} />
			</Stack>
			{
				<LoadingOrScript getUrl={getUrl} isAutomatic={isAutomatic} getEventId={getEventId} />
			}
		</section>
	)
}

const LoadingOrScript = (props: {
	getUrl: () => string,
	isAutomatic: boolean,
	getEventId: () => string,
}) => {
	const { isLoading } = useContext(DataContext);

	return isLoading ? (
		<CircularProgress
			style={{
				alignSelf: "center"
			}}
		/>
	) : (
		<AutomaticOrStatic getUrl={props.getUrl} isAutomatic={props.isAutomatic} getEventId={props.getEventId} />
	)
}

const AutomaticOrStatic = (props: {
	getUrl: () => string,
	isAutomatic: boolean,
	getEventId: () => string,
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const copy = () => {
		navigator.clipboard.writeText(`sh -c "$(curl -fsSL ${props.getUrl()}${props.getEventId()})"`);
		setIsCopied(true);
	}

	const getCleanUrl = () => {
		return props.getUrl().replace(/http.?:\/\//g, "");
	}

	return (
		<ValidationTooltip isValidated={isCopied} setIsValidated={setIsCopied} validatedTitle="Copied" notValidatedTitle="Click to copy">
			{
				props.getEventId() === "static" ? (
					<BlackPaperWithoutThatsYou onClick={copy}>
						<span>sh -c "$(curl -fsSL {getCleanUrl()}<span style={{ color: "#9AE7FF" }}>{props.getEventId()}</span>)"</span>
					</BlackPaperWithoutThatsYou>
				) : (
					<BlackPaper onClick={copy}>
						<span>sh -c "$(curl -fsSL {getCleanUrl()}<span style={{ color: "#9AE7FF" }}>{props.getEventId()}</span>)"</span>
					</BlackPaper>
				)
			}
		</ValidationTooltip>
	)
}