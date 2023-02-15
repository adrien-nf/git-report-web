import { CircularProgress, Paper, Stack, styled, Switch, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { DataContext } from "../../../contexts/DataContext/DataContext"
import ThatsYou from "../../../assets/ThatsYou.svg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LinkBadge from "../../../components/LinkBadge/LinkBadge";
import ValidationTooltip from "../../../components/ValidationTooltip/ValidationTooltip";

const BlackPaperWithoutThatsYou = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.common.black,
	borderRadius: 2,
	padding: theme.spacing(3),
	cursor: "pointer",
	"&::before": {
		content: '"$"',
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.main
	},
}))

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
}))

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
			<Stack marginBottom="25px" justifyContent="space-between" direction="row" alignItems="center">
				<SectionTitle noMargin>Get started now !</SectionTitle>
				{
					(isError || isLoading) ? ""
						: (
							<Stack direction="row" alignItems="center">
								<Typography variant="body1">Manual</Typography>
								<Switch value={isAutomatic} onChange={(event) => setIsAutomatic(event.target.checked)} defaultChecked />
								<Typography variant="body1">Automatic</Typography>
							</Stack>
						)
				}
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

	const [isCopied, setIsCopied] = useState(false);

	return isLoading ? (
		<CircularProgress
			style={{
				alignSelf: "center"
			}}
		/>
	) : (
		<ValidationTooltip isValidated={isCopied} setIsValidated={setIsCopied} validatedTitle="Copied" notValidatedTitle="Click to copy">
			<div>
				<AutomaticOrStatic getUrl={props.getUrl} isAutomatic={props.isAutomatic} getEventId={props.getEventId} />
			</div>
		</ValidationTooltip>
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