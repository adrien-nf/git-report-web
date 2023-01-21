import { ReportData } from "../../types/ReportData";

export interface Exporter {
	export(reportData: ReportData): void;
}