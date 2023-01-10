import React, { createContext, useEffect, useState } from 'react';
import Papa, { ParseRemoteConfig } from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Commit } from '../../types/Commit';
import { ReportData } from '../../types/ReportData';

type EventId = string | undefined;

interface DataContextSpecs {
	eventId: EventId,
	reportData: ReportData,
}

const emptyReportData: ReportData = {
	projects: new Map(),
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	reportData: emptyReportData,
});

const parseCommit = (e: any): Commit => ({
	id: e[1],
	username: e[2],
	email: e[3],
	date: e[4],
	description: e[5]
})

const mapData = (data: any[]): ReportData => {
	const reportData: ReportData = {
		projects: new Map(),
	}

	data.forEach(e => {
		const projectName = e[0];
		if (!reportData.projects.has(projectName)) reportData.projects.set(projectName, {
			name: projectName,
			commits: [],
		})

		reportData.projects.get(projectName)!.commits.push(parseCommit(e));
	})

	return reportData;
}

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const navigate = useNavigate();

	const [eventId, setEventId] = useState<EventId>(undefined);
	const [reportData, setReportData] = useState<ReportData>(emptyReportData);

	useEffect(() => {
		const sse = new EventSource("/api/see");

		sse.addEventListener("init", (event) => {
			setEventId(event.lastEventId);
		})

		sse.addEventListener('commits-ready', (event) => {
			const id = event.lastEventId;
			const url = `/api/get-commits/${id}`;
			Papa.parse(url, {
				download: true,
				skipEmptyLines: true,
				complete(results) {
					setReportData(mapData(results.data));
					return navigate("/report");
				},
			} as ParseRemoteConfig);
		});

		sse.onerror = (e) => {
			sse.close();
		}

		return () => {
			sse.close();
		};
	}, [navigate]);

	const contextValue = {
		eventId,
		reportData,
	};

	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
}