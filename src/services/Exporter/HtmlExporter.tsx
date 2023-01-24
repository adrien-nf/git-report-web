import { ReportData } from "../../types/ReportData";
import { Exporter } from "./Exporter";

export class HtmlExporter implements Exporter {
	public export(reportData: ReportData): void {
		const buffer: string[] = [];

		buffer.push(`<p>${reportData.before}</p>`)

		reportData.projects.forEach(p => {
			buffer.push(`<h1>${p.name}</h1>`);
			buffer.push("<ul>");
			buffer.push(p.commits.split("\n").map(e => `<li>${e}</li>`).join(""));
			buffer.push("</ul>");
		})

		buffer.push(`<p>${reportData.after}</p>`)

		navigator.clipboard.writeText(buffer.join(""));
	}
}