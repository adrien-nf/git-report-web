import { Project } from './Project';

export type ReportData = {
	projects: Map<Project["name"], Project>,
}