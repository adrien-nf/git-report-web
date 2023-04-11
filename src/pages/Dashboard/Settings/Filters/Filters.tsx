import { Stack, Slider, styled, Button, Box } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { DataContext } from "../../../../contexts/DataContext/DataContext";
import { ParsedProject } from "../../../../types/ParsedProject";
import { Project } from "../../../../types/Project";
import { ReportData } from "../../../../types/ReportData";

const SliderContainer = styled('div')(() => ({
	marginTop: '-14px',
}));

const ControlsContainer = styled('div')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '15px',
	flexWrap: 'wrap',
});

const ButtonsContainer = styled('div')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '8px',
	flexWrap: 'wrap',
	'& > button': {
		flex: '1 1',
		whiteSpace: 'nowrap',
	}
});

const StatsContainer = styled('div')({
	'& > strong': {
		fontFamily: '\'Kanit\', sans-serif',
		fontSize: '18px',
	}
});

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

	const [projectsNumber, totalCommitsNumber] = useMemo(() => {
		const { projects } = props.reportData;
		const commitsNumber = Array.from(projects.values()).reduce((acc, project) => {
			acc += project.commits.split('\n').length;
			return acc;
		}, 0);
		return [projects.size, commitsNumber];
	}, [props.reportData]);

	return (
		<section id="date">
			<SectionTitle>Date range</SectionTitle>
			<SliderContainer>
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
			</SliderContainer>
			<ControlsContainer>
				<ButtonsContainer>
					<Button onClick={() => updateToDaysAgo(7)}>1 week</Button>
					<Button onClick={() => updateToDaysAgo(14)}>2 weeks</Button>
					<Button onClick={updateToLastMonth}>1 month</Button>
					<Button onClick={updateToAllTime}>All time</Button>
				</ButtonsContainer>
				<StatsContainer>
					Found <strong>{totalCommitsNumber}</strong> commits over <strong>{projectsNumber}</strong> repositories
				</StatsContainer>
			</ControlsContainer>
		</section>
	)
}