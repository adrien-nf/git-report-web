import { Stack, Slider } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import ButtonBadge from "../../../../components/ButtonBadge/ButtonBadge";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { DataContext } from "../../../../contexts/DataContext/DataContext";
import { ParsedProject } from "../../../../types/ParsedProject";
import { Project } from "../../../../types/Project";
import { ReportData } from "../../../../types/ReportData";

export default function Filters(props: {
	reportData: ReportData,
	setReportData: Dispatch<SetStateAction<ReportData>>,
	selectedProject: Project | undefined,
	setSelectedProject: Dispatch<SetStateAction<Project | undefined>>,
}) {
	const [availableDates, setAvailableDates] = useState<Date[]>([]);
	const [pickedDates, setPickedDates] = useState<number[]>([-1, -1]);

	const { projects } = useContext(DataContext);

	const handleDateRangeChange = (event: Event, newValue: number | number[]) => {
		setPickedDates(newValue as number[])
	}

	const updateToLastMonth = () => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		date.setMonth(date.getMonth() - 1);
		updateTo(date);
	}

	const updateTo = (date: Date) => {
		const correctIndex = [...availableDates].reverse().findIndex((e) => e < date)

		updateDates([availableDates.length - correctIndex, availableDates.length - 1]);
	}

	const updateDates = (values: number[]) => {
		if (availableDates.length === 0) return;

		const min = availableDates[values[0]];
		const max = availableDates[values[1]];

		const projectsToIterateOver = Array.from(projects.values());

		const reportData: ReportData = { projects: new Map(), before: props.reportData.before, after: props.reportData.after };

		projectsToIterateOver.forEach(project => {
			const newProject: Project = {
				commits: project.commits.filter(e => e.date >= min && e.date <= max).map(e => e.description).join("\n"),
				name: project.name,
				options: {
					shown: true
				}
			}

			if (newProject.commits.length > 0) {
				reportData.projects.set(project.name, newProject)
			}
		})

		props.setReportData(reportData);
		props.setSelectedProject(reportData.projects.values().next().value);
		setPickedDates(values)
	}

	const updateToDaysAgo = (daysAgo: number) => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() - daysAgo);
		updateTo(date);
	}

	const updateToAllTime = () => {
		updateDates([0, availableDates.length - 1]);
	}

	const handleDateRangeChangeCommitted = (event: Event | React.SyntheticEvent<Element, Event>, values: number | number[]) => {
		values = values as number[];
		updateDates(values);
	}


	useEffect(() => {
		const newDates = (Array.from(projects.values()))
			.reduce<Date[]>((dates: Date[], project: ParsedProject) => {
				return dates.concat(project.commits.map(e => e.date))
			}, [])

		setAvailableDates(newDates.sort((a, b) => a.getTime() - b.getTime()))

		setPickedDates([0, newDates.length - 1])
	}, [projects])

	return (
		<Stack>
			<SectionTitle>Date range</SectionTitle>
			<Slider
				getAriaLabel={() => 'Commits date range'}
				valueLabelDisplay="auto"
				valueLabelFormat={(value: number) => {
					if (typeof availableDates[value] === "undefined") return "";

					return availableDates[value].toDateString()
				}}
				value={pickedDates}
				min={0}
				max={availableDates.length - 1}
				onChange={handleDateRangeChange}
				onChangeCommitted={handleDateRangeChangeCommitted}
			/>
			<Stack direction="row" columnGap={2}>
				<ButtonBadge onClick={() => updateToDaysAgo(7)}>1 week</ButtonBadge>
				<ButtonBadge onClick={() => updateToDaysAgo(14)}>2 weeks</ButtonBadge>
				<ButtonBadge onClick={updateToLastMonth}>1 month</ButtonBadge>
				<ButtonBadge onClick={updateToAllTime}>All time</ButtonBadge>
			</Stack>
		</Stack>
	)
}