import Papa, { ParseRemoteConfig } from "papaparse";

export class RemoteParser {
	public static parse(url: string, complete: (results: any) => void) {
		Papa.parse(url, {
			download: true,
			skipEmptyLines: true,
			complete,
		} as ParseRemoteConfig);
	}
}