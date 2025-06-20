export enum LogLevel {
	Verbose,
	Info,
	Warn,
	Error,
}

export class Logger {
	private static timestamp(): string {
		const now: Date = new Date();
		return "\x1b[36m" + now.toLocaleString("sv-SE", {
			hour12: false
		}) + "." + now.getMilliseconds().toString().padStart(3, "0") + "\x1b[0m";
	}

	public static getLevelName(level: LogLevel): string {
		return LogLevel[level];
	}

	public throw: boolean = true;
	public prefix: string;
	public level: LogLevel;
	constructor(tag: string = "Unknown", level: LogLevel = LogLevel.Info) {
		this.prefix = ("[" + tag + "]").padEnd(10, " ");
		this.level = level;
	}

	public verbose(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			console.log(Logger.timestamp() + " \x1b[34m[VERBOSE] \x1b[0m" + this.prefix + message);
		}
	}

	public info(message: string): void {
		if (this.level <= LogLevel.Info) {
			console.log(Logger.timestamp() + " \x1b[37m[INFO]    \x1b[0m" + this.prefix + message);
		}
	}

	public warn(message: string): void {
		if (this.level <= LogLevel.Warn) {
			console.log(Logger.timestamp() + " \x1b[33m[WARNING] \x1b[0m" + this.prefix + message);
		}
	}

	public error(message: string): void {
		if (this.level <= LogLevel.Error) {
			const fmessage: string = Logger.timestamp() + " \x1b[31m[ERROR]   \x1b[0m" + this.prefix + message;
			if (this.throw) {
				throw new Error(fmessage);
			} else {
				console.error(fmessage);
				console.trace("\x1b[90m" + message);
				console.log("\x1b[0m");
			}
		}
	}
}
