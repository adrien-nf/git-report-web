interface MessageData {
	type: string,
	data: any,
}

export interface MessageReceived extends MessageData {
	type: "received",
	data: number,
}

export interface MessageReport extends MessageData {
	type: "report",
	data: string,
}

export type AnyMessage = MessageReceived | MessageReport;