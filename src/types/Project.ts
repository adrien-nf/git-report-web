import { Commit } from "./Commit";

type Options = {
	shown: boolean,
}

export type Project = {
	name: string,
	commits: Commit[],
	options: Options,
};