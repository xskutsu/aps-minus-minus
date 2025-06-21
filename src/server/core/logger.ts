export enum LogLevel {
	Verbose,
	Info,
	Warn,
	Error,
}

export class Logger {
	public static throw: boolean = true;
	public static level: LogLevel = LogLevel.Info;

	public static getLevelName(level: LogLevel): string {
		return LogLevel[level];
	}

	public static verbose(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			console.log(Logger.getTimestamp() + " \x1b[34m[VERBOSE] \x1b[0m" + message);
		}
	}

	public static info(message: string): void {
		if (this.level <= LogLevel.Info) {
			console.log(Logger.getTimestamp() + " \x1b[37m[INFO]    \x1b[0m" + message);
		}
	}

	public static warn(message: string): void {
		if (this.level <= LogLevel.Warn) {
			console.log(Logger.getTimestamp() + " \x1b[33m[WARNING] \x1b[0m" + message);
		}
	}

	public static error(message: string): void {
		if (this.level <= LogLevel.Error) {
			const fmessage: string = this.getTimestamp() + " \x1b[31m[ERROR]   \x1b[0m" + message;
			if (this.throw) {
				throw new Error(fmessage);
			} else {
				console.error(fmessage);
				console.trace("\x1b[90m" + message);
				console.log("\x1b[0m");
			}
		}
	}

	private static getTimestamp(): string {
		const now: Date = new Date();
		return "\x1b[36m" + now.toLocaleString("sv-SE", {
			hour12: false
		}) + "." + now.getMilliseconds().toString().padStart(3, "0") + "\x1b[0m";
	}
}
