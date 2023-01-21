import { ReportData } from "../../types/ReportData";
import { Exporter } from "./Exporter";

export class HtmlExporter implements Exporter {
	public export(reportData: ReportData): void {
		navigator.clipboard.writeText("coucou toi");
	}
}