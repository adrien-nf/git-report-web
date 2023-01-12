import Papa, { ParseWorkerConfig } from "papaparse";

export class LocalParser {
	public static parse(content: string, complete: (results: any) => void) {
		Papa.parse(content, {
			skipEmptyLines: true,
			complete,
		} as ParseWorkerConfig)
	}
}