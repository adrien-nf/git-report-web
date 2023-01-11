import React, { createContext, useEffect, useState } from 'react';
import Papa, { ParseRemoteConfig } from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Commit } from '../../types/Commit';
import { ProjectMap } from '../../types/ReportData';

type EventId = string | undefined;

interface DataContextSpecs {
	eventId: EventId,
	projects: ProjectMap,
}

export const DataContext = createContext<DataContextSpecs>({
	eventId: undefined,
	projects: new Map(),
});

const parseCommit = (e: any): Commit => ({
	id: e[1],
	username: e[2],
	email: e[3],
	date: e[4],
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

		// TODO: Remove this line when commits will be handled as objects
		projects.get(projectName)!.commits = projects.get(projectName)!.commits.trim();
	})


	// projects.set("Test", {
	// 	commits: "qsdq\n",
	// 	name: "Salut",
	// 	options: {
	// 		shown: true,
	// 	}
	// })
	// projects.set("SQSD", {
	// 	commits: "",
	// 	name: "Salqdsut",
	// 	options: {
	// 		shown: true,
	// 	}
	// })
	// projects.set("SQSssD", {
	// 	commits: "",
	// 	name: "Salqdqqqsut",
	// 	options: {
	// 		shown: true,
	// 	}
	// })
	// projects.set("ssssSQSD", {
	// 	commits: "",
	// 	name: "Salqqsdqdqsdsdsqdsdsut",
	// 	options: {
	// 		shown: true,
	// 	}
	// })

	return projects;
}

export function DataContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const navigate = useNavigate();

	const [eventId, setEventId] = useState<EventId>(undefined);
	const [projects, setProjects] = useState<ProjectMap>(new Map());

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
					setProjects(mapData(results.data));
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
		projects,
	};

	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
}