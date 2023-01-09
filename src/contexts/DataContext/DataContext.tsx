import React, { createContext, useEffect, useState } from 'react';
import Papa, { ParseRemoteConfig } from 'papaparse';

type EventId = string | undefined;

type Commit = {};

interface DataContextSpecs {
	eventId: EventId,
	commits: Commit[],
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	commits: [],
});

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {

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
					console.log(results);
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