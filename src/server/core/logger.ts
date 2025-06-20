export enum LogLevel {
	Verbose,
	Info,
	Warn,
	Error,
}

export class Logger {
	public static level: LogLevel = LogLevel.Info;
	public static throw: boolean = true;

	public static getLevelName(): string {
		return LogLevel[this.level];
	}

	public static timestamp(): string {
		return `(${new Date().toString()})`;
	}

	public static verbose(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			console.log(`${this.timestamp()} [INFO] ${message}`);
		}
	}

	public static info(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			console.log(`${this.timestamp()} [INFO] ${message}`);
		}
	}

	public static warn(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			console.warn(`${this.timestamp()} [WARNING] ${message}`);
		}
	}

	public static error(message: string): void {
		if (this.level <= LogLevel.Verbose) {
			const fmessage: string = `${this.timestamp()} [ERROR] ${message}`;
			if (this.throw) {
				throw new Error(fmessage);
			} else {
				console.error(fmessage);
			}
		}
	}
}
