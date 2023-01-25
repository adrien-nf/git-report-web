import { CircularProgress, Paper, Stack, styled, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { DataContext } from "../../../contexts/DataContext/DataContext"
import ThatsYou from "../../../assets/ThatsYou.svg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LinkBadge from "../../../components/LinkBadge/LinkBadge";
import ValidationTooltip from "../../../components/ValidationTooltip/ValidationTooltip";

const BlackPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.common.black,
	borderRadius: 2,
	padding: theme.spacing(2),
	cursor: "pointer",
	"&::before": {
		content: '"$"',
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(1),
		color: "#00C2FF"
	},
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
	const { eventId, isError } = useContext(DataContext);

	const [isCopied, setIsCopied] = useState(false);

	const getUrl = (): string => {
		return window.location.href + "api/script/";
	}

	const getFullUrl = (): string => {
		return window.location.href + "api/script/" + eventId;
	}

	const copy = () => {
		if (eventId) {
			navigator.clipboard.writeText(`sh -c "$(curl -fsSL ${getUrl()}${eventId})"`);
			setIsCopied(true);
		}
	}

	return (
		<Stack spacing={2}>
			<Stack justifyContent="space-between" direction="row">
				<SectionTitle>Get started now !</SectionTitle>
				{
					eventId ? (
						<LinkBadge text="Show the full script" link={getFullUrl()} />
					) : ""
				}
			</Stack>
			{
				eventId ? (
					<ValidationTooltip isValidated={isCopied} setIsValidated={setIsCopied} validatedTitle="Copied" notValidatedTitle="Click to copy">
						<BlackPaper onClick={copy}>
							<span>sh -c "$(curl -fsSL {getUrl()}<span style={{ color: "#9AE7FF" }}>{eventId}</span>)"</span>
						</BlackPaper>
					</ValidationTooltip>
				) : (
					<LoadingOrError isError={isError} />
				)
			}
		</Stack>
	)
}

const LoadingOrError = (props: {
	isError: boolean,
}) => {
	return props.isError ? (
		<Typography
			style={{
				alignSelf: "center",
			}}>
			Could not establish connection to the server. Please drop a CSV file.
		</Typography>
	) : (
		<CircularProgress
			style={{
				alignSelf: "center"
			}}
		/>
	)
}