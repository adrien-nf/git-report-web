import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Commit } from '../../types/Commit';
import Dropzone from 'react-dropzone';
import { RemoteParser } from '../Parsers/RemoteParser';
import { LocalParser } from '../Parsers/LocalParser';
import { useToasts } from '../../hooks/useToats';
import { Backdrop, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Stack from '@mui/material/Stack';
import { ParsedProjectMap } from '../../types/ParsedProject';

type EventId = string | undefined;

interface DataContextSpecs {
	eventId: EventId,
	projects: ParsedProjectMap,
	isError: boolean,
	isLoading: boolean,
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	projects: new Map(),
	isError: false,
	isLoading: true,
});

const parseCommit = (e: any): Commit => ({
	id: e[1],
	username: e[2],
	email: e[3],
	date: new Date(e[4]),
	description: e[5]
})

const mapData = (data: any[]): ParsedProjectMap => {
	const projects: ParsedProjectMap = new Map();

	data.forEach(e => {
		const projectName = e[0];
		if (!projects.has(projectName)) {
			projects.set(projectName, {
				name: projectName,
				commits: [],
			})
		}

		projects.get(projectName)!.commits.push(parseCommit(e));
	})

	return projects;
}

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const navigate = useNavigate();

	const [eventId, setEventId] = useState<EventId>(undefined);
	const [projects, setProjects] = useState<ParsedProjectMap>(new Map());
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isFileBackdropOpen, setIsFileBackdropOpen] = useState(false);

	const { errorSnackbar } = useToasts();

	const onCsvReceived = (results: any) => {
		const projects = mapData(results.data);
		if (projects.size > 0) {
			setProjects(projects);
			return navigate("/report");
		} else {
			errorSnackbar("0 commits were retrieved. Couldn't generate report.")
		}
	}

	useEffect(() => {
		const sse = new EventSource("/api/see");

		sse.addEventListener("init", (event) => {
			setEventId(event.lastEventId);
			setIsLoading(false);
		})

		sse.addEventListener('commits-ready', (event) => {
			const id = event.lastEventId;
			const url = `/api/get-commits/${id}`;
			RemoteParser.parse(url, onCsvReceived)
		});

		sse.onerror = (e) => {
			setIsError(true);
			setIsLoading(false);
			sse.close();
		}

		return () => {
			sse.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate]);

	const contextValue = {
		eventId,
		projects,
		isError,
		isLoading,
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