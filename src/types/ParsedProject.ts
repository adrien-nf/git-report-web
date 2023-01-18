import { Commit } from "./Commit";

export type ParsedProjectMap = Map<ParsedProject["name"], ParsedProject>;

export type ParsedProject = {
	name: string,
	commits: Commit[],
};