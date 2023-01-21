import { ReportData } from "../../types/ReportData";
import { Exporter } from "./Exporter";

export class TextExporter implements Exporter {
	public export(reportData: ReportData): void {
		const buffer: string[] = [];

		reportData.projects.forEach(p => {
			buffer.push(p.name);
			buffer.push(p.commits.split("\n").map(e => `- ${e}`).join("\n"));
		})

		navigator.clipboard.writeText(buffer.join("\n"));
	}
}