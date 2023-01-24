import { Exporter } from "./Exporter";
import { ExportType } from "./ExportType";
import { HtmlExporter } from "./HtmlExporter";
import { TextExporter } from "./TextExporter";

export class ExporterFactory {
	public static generate(as: ExportType): Exporter {
		switch (as) {
			case ExportType.Html:
				return new HtmlExporter();
			case ExportType.Text:
				return new TextExporter();
		}
	}
}