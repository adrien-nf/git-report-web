import { ButtonGroup, Slider, Stack, Button, Box, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ReportData } from "../../../types/ReportData";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ParsedProject } from "../../../types/ParsedProject";
import { Project } from "../../../types/Project";
import { DataContext } from "../../../contexts/DataContext/DataContext";
import ButtonBadge from "../../../components/ButtonBadge/ButtonBadge";

export default function Settings(props: {
	reportData: ReportData,
	setReportData: Dispatch<SetStateAction<ReportData>>,
	selectedProject: Project | undefined,
	setSelectedProject: Dispatch<SetStateAction<Project | undefined>>,
}) {
	const [commits, setCommits] = useState("");

	const { projects } = useContext(DataContext);

	const [availableDates, setAvailableDates] = useState<Date[]>([]);
	const [pickedDates, setPickedDates] = React.useState<number[]>([-1, -1]);

	useEffect(() => {
		setCommits(props.selectedProject?.commits || "");
	}, [props.selectedProject])

	useEffect(() => {
		props.setReportData(reportData => {
			if (props.selectedProject) {
				props.selectedProject.commits = commits;
			}

			const newReportData = { ...reportData }

			return newReportData;
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commits])

	useEffect(() => {
		const newDates = (Array.from(projects.values()))
			.reduce<Date[]>((dates: Date[], project: ParsedProject) => {
				return dates.concat(project.commits.map(e => e.date))
			}, [])

		setAvailableDates(newDates.sort((a, b) => a.getTime() - b.getTime()))

		setPickedDates([0, newDates.length - 1])
	}, [projects])

	const toggleVisibility = (project: Project) => {
		props.setReportData(reportData => {
			project.options.shown = !project.options.shown;

			const newReportData = { ...reportData }

			return newReportData;
		})
	}

	const handleDateRangeChange = (event: Event, newValue: number | number[]) => {
		setPickedDates(newValue as number[])
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

	const updateToLastMonth = () => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		date.setMonth(date.getMonth() - 1);
		updateTo(date);
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

	const updateBefore = (before: string) => {
		console.log(before);
		props.setReportData(report => ({ ...report, before }))
	}

	const updateAfter = (after: string) => {
		props.setReportData(report => ({ ...report, after }))

	}

	return (
		<Box flexGrow={1}>
			<Stack spacing={5}>
				<Box>
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
				</Box>
				<Box>
					<SectionTitle>Topics</SectionTitle>
					<Stack direction="row" columnGap={2} rowGap={2} flexWrap="wrap">
						{
							(Array.from(props.reportData.projects.values())).map(e => (
								<ButtonGroup size="small" aria-label="small button group" key={e.name}>
									<Button variant={props.selectedProject?.name === e.name ? "contained" : "outlined"} onClick={() => props.setSelectedProject(e)}>{e.name}</Button>
									<Button onClick={() => toggleVisibility(e)}>
										{
											props.reportData.projects.get(e.name)!.options.shown ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)
										}
									</Button>
								</ButtonGroup>
							))
						}
					</Stack>
				</Box>
				<Box>
					<Stack>
						<SectionTitle>Items <span>{props.selectedProject?.name}</span></SectionTitle>
						<TextField label="Commits" multiline value={commits} onChange={(e) => setCommits(e.target.value)} />
					</Stack>
				</Box>
				<Box>
					<Stack>
						<SectionTitle>Before</SectionTitle>
						<TextField label="Before" multiline onChange={(event) => updateBefore(event.target.value)} />
					</Stack>
				</Box>
				<Box>
					<Stack>
						<SectionTitle>After</SectionTitle>
						<TextField label="After" multiline onChange={(event) => updateAfter(event.target.value)} />
					</Stack>
				</Box>
			</Stack >
		</Box >
	)
}