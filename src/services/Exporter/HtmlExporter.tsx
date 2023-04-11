import { ReportData } from "../../types/ReportData";
import { Exporter } from "./Exporter";

export class HtmlExporter implements Exporter {
	public export(reportData: ReportData): void {
		const buffer: string[] = [];

		buffer.push(`<p>${reportData.before}</p>`)

		reportData.projects.forEach(p => {
			buffer.push(`<h2>${p.name}</h2>`);
			buffer.push("<ul>");
			buffer.push(p.commits.split("\n").map(e => `<li>${e}</li>`).join(""));
			buffer.push("</ul>");
		})

		buffer.push(`<p>${reportData.after}</p>`)

		var type = "text/html";
		var blob = new Blob([buffer.join("").trim()], { type });
		var data = [new ClipboardItem({ [type]: blob })];

		navigator.clipboard.write(data);
	}
}