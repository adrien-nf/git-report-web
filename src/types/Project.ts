import { Commit } from "./Commit";

export type Project = {
	name: string,
	commits: Commit[],
};