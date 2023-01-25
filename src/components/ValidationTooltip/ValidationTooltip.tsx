import { Tooltip } from "@mui/material"
import { Dispatch, ReactElement, SetStateAction } from "react"

export default function ValidationTooltip(props: {
	isValidated: boolean,
	setIsValidated: Dispatch<SetStateAction<boolean>>,
	validatedTitle: string,
	notValidatedTitle: string,
	children: ReactElement,
}) {
	return (
		<Tooltip
			title={props.isValidated ? props.validatedTitle : props.notValidatedTitle}
			onClose={() => props.setIsValidated(false)}
			placement="top"
		>
			{props.children}
		</Tooltip>
	)
}