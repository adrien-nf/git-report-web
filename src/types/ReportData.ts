import { Project } from './Project';

export type ProjectMap = Map<Project["name"], Project>;

export type ReportData = {
	projects: ProjectMap,
	before: string,
	after: string,
}