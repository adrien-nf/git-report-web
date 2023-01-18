import { ButtonGroup, Slider, Stack, Button, Box, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ReportData } from "../../../types/ReportData";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ParsedProject } from "../../../types/ParsedProject";
import { Project } from "../../../types/Project";
import FloatingFooter from "../FloatingFooter/FloatingFooter";
import { DataContext } from "../../../contexts/DataContext/DataContext";

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
		if (availableDates.length === 0) return;

		const min = availableDates[pickedDates[0]];
		const max = availableDates[pickedDates[1]];

		const projectsToIterateOver = Array.from(projects.values());

		const reportData: ReportData = { projects: new Map() };

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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pickedDates])

	useEffect(() => {
		const newDates = (Array.from(projects.values()))
			.reduce<Date[]>((dates: Date[], project: ParsedProject) => {
				return dates.concat(project.commits.map(e => e.date))
			}, [])

		setAvailableDates(newDates.reverse())

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

		setPickedDates([availableDates.length - correctIndex, availableDates.length - 1])
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
		setPickedDates([0, availableDates.length - 1])
	}

	return (
		<Box>
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
					/>
					<Stack direction="row">
						<Button onClick={() => updateToDaysAgo(7)}>1 week</Button>
						<Button onClick={() => updateToDaysAgo(14)}>2 weeks</Button>
						<Button onClick={updateToLastMonth}>1 month</Button>
						<Button onClick={updateToAllTime}>All time</Button>
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
			</Stack >
			<FloatingFooter></FloatingFooter>
		</Box >
	)
}