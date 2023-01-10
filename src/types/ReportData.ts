import { Project } from './Project';

export type ProjectMap = Map<Project["name"], Project>;

export type ReportData = {
	projects: Project[],
}