import { Stack, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ReportData } from "../../../../types/ReportData";

export default function EditReport(props: {
	setReportData: Dispatch<SetStateAction<ReportData>>,
}) {
	const updateBefore = (before: string) => {
		console.log(before);
		props.setReportData(report => ({ ...report, before }))
	}

	const updateAfter = (after: string) => {
		props.setReportData(report => ({ ...report, after }))

	}

	return (
		<React.Fragment>
			<Stack>
				<SectionTitle>Before</SectionTitle>
				<TextField label="Before" multiline onChange={(event) => updateBefore(event.target.value)} />
			</Stack>
			<Stack>
				<SectionTitle>After</SectionTitle>
				<TextField label="After" multiline onChange={(event) => updateAfter(event.target.value)} />
			</Stack>
		</React.Fragment>
	)
}