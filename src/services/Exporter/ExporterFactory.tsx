import { Exporter } from "./Exporter";
import { HtmlExporter } from "./HtmlExporter";
import { TextExporter } from "./TextExporter";

export type ExportType = "html" | "text";

export class ExporterFactory {
	public static generate(as: ExportType): Exporter {
		switch (as) {
			case "html":
				return new HtmlExporter();
			case "text":
				return new TextExporter();
		}
	}
}