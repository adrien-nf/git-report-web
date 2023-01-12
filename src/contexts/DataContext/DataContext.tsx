import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Commit } from '../../types/Commit';
import { ProjectMap } from '../../types/ReportData';
import Dropzone from 'react-dropzone';
import { RemoteParser } from '../Parsers/RemoteParser';
import { LocalParser } from '../Parsers/LocalParser';
import { useToasts } from '../../hooks/useToats';
import { Backdrop, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Stack from '@mui/material/Stack';

type EventId = string | undefined;

interface DataContextSpecs {
	eventId: EventId,
	projects: ProjectMap,
	isError: boolean,
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	projects: new Map(),
	isError: false,
});

const parseCommit = (e: any): Commit => ({
	id: e[1],
	username: e[2],
	email: e[3],
	date: new Date(e[4]),
	description: e[5]
})

const mapData = (data: any[]): ProjectMap => {
	const projects: ProjectMap = new Map();

	data.forEach(e => {
		const projectName = e[0];
		if (!projects.has(projectName)) {
			projects.set(projectName, {
				name: projectName,
				commits: "",
				options: {
					shown: true,
				}
			})
		}

		projects.get(projectName)!.commits += "\n" + parseCommit(e).description;
		projects.get(projectName)!.commits = projects.get(projectName)!.commits.trim();
	})

	return projects;
}

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const navigate = useNavigate();

	const [eventId, setEventId] = useState<EventId>(undefined);
	const [projects, setProjects] = useState<ProjectMap>(new Map());
	const [isError, setIsError] = useState(false);
	const [isFileBackdropOpen, setIsFileBackdropOpen] = useState(false);

	const { errorSnackbar } = useToasts();

	const onCsvReceived = (results: any) => {
		setProjects(mapData(results.data));
		return navigate("/report");
	}

	useEffect(() => {
		const sse = new EventSource("/api/see");

		sse.addEventListener("init", (event) => {
			setEventId(event.lastEventId);
		})

		sse.addEventListener('commits-ready', (event) => {
			const id = event.lastEventId;
			const url = `/api/get-commits/${id}`;
			RemoteParser.parse(url, onCsvReceived)
		});

		sse.onerror = (e) => {
			setIsError(true);
			sse.close();
		}

		return () => {
			sse.close();
		};
	}, [navigate]);

	const contextValue = {
		eventId,
		projects,
		isError,
	};

	return (
		<DataContext.Provider value={contextValue}>
			<Dropzone
				noClick={true}
				onDropAccepted={files => {
					const reader = new FileReader()

					const file = files[0];

					reader.onabort = () => errorSnackbar("File upload aborted.")
					reader.onerror = () => errorSnackbar("File upload failed.")
					reader.onload = () => LocalParser.parse(reader.result as string, onCsvReceived)
					reader.readAsText(file)
				}}
				onDropRejected={() => {
					errorSnackbar("File isn't a valid CSV.")
				}}
				onDrop={() => {
					setIsFileBackdropOpen(false)
				}}
				onDragEnter={() => {
					setIsFileBackdropOpen(true)
				}}
				onDragLeave={() => {
					setIsFileBackdropOpen(false)
				}}
				multiple={false}
				accept={{
					"text/csv": [".csv"]
				}}
			>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} hidden />
						{children}

						<Backdrop
							sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
							open={isFileBackdropOpen}
						>
							<Stack alignItems="center">
								<FileDownloadIcon fontSize="large" />
								<Typography>Drag and drop a CSV file here</Typography>
							</Stack>
						</Backdrop>
					</div>
				)}

			</Dropzone>
		</DataContext.Provider >
	);
}