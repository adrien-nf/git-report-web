import React, { createContext, useEffect, useState } from 'react';
import Papa, { ParseRemoteConfig } from 'papaparse';
import { useNavigate } from 'react-router-dom';

type EventId = string | undefined;

type Commit = {
	id: string,
	date: string,
	description: string,
};

interface DataContextSpecs {
	eventId: EventId,
	commits: Commit[],
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	commits: [],
});

const mapData = (data: any[]): Commit[] => {
	return data.map(e => ({
		id: e[1],
		date: e[2],
		description: e[3]
	}));
}

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const navigate = useNavigate();

	const [eventId, setEventId] = useState<EventId>("66898b08-cf57-df04-060d-dfe35745d593");
	const [commits, setCommits] = useState<Commit[]>([]);

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
					setCommits(mapData(results.data));
					return navigate("/report");
				},
			} as ParseRemoteConfig);
		});

		sse.onerror = (e) => {
			console.log(e)

			sse.close();
		}

		return () => {
			sse.close();
		};
	}, []);

	const contextValue = {
		eventId,
		commits,
	};

	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
}