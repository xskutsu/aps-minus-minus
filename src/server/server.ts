enum LogLevel {
	Info = 2,
	Warn = 1,
	Error = 0
}

class Logger {
	public static level: LogLevel = LogLevel.Info;

	public static getLevelName(): string {
		return LogLevel[this.level];
	}

	public static timestamp(): string {
		return `(${new Date().toString()})`;
	}

	public static info(message: string): void {
		if (this.level >= LogLevel.Info) {
			console.log(`${this.timestamp()} [INFO] ${message}`);
		}
	}

	public static warn(message: string): void {
		if (this.level >= LogLevel.Warn) {
			console.warn(`${this.timestamp()} [WARNING] ${message}`);
		}
	}

	public static error(message: string): void {
		if (this.level >= LogLevel.Error) {
			console.error(`${this.timestamp()} [ERROR] ${message}`);
		}
	}
}

console.log(`Starting aps-minus-minus. Log level: ${Logger.getLevelName()}.`);

class Vector {
	public static nullify(vector: Vector): void {
		vector.x = 0;
		vector.y = 0;
	}

	private _dirtyLength: boolean = true;
	private _length: number = 0;
	private _dirtyDirection: boolean = true;
	private _direction: number = 0;
	private _x: number;
	private _y: number;
	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	public get x(): number {
		return this._x;
	}

	public set x(value: number) {
		this._x = value;
		if (!this._dirtyLength) {
			this._dirtyLength = true;
		}
		if (!this._dirtyDirection) {
			this._dirtyDirection = true;
		}
	}

	public get y(): number {
		return this._y;
	}

	public set y(value: number) {
		this._y = value;
		if (!this._dirtyLength) {
			this._dirtyLength = true;
		}
		if (!this._dirtyDirection) {
			this._dirtyDirection = true;
		}
	}

	public get length() {
		if (this._dirtyLength) {
			this._dirtyLength = false;
			this._length = Math.sqrt(this._x * this._x + this._y * this._y);
		}
		return this._length;
	}

	public get direction() {
		if (this._dirtyDirection) {
			this._dirtyDirection = false;
			this._direction = Math.atan2(this._y, this._x);
		}
		return this._direction;
	}
}

const RoomCellTypes = ["norm", "nest", "roid", "rock", "bas1", "bas2", "bas3", "bas4"] as const;
type RoomCellType = typeof RoomCellTypes[number];

type GameMode = "ffa" | "tdm";

class Room {
	public static lastCycle: number = performance.now();
	public static cycleSpeed: number = 1000 / 30;
	public static width: number = 2000;
	public static height: number = 2000;
	public static layout: RoomCellType[][] = [
		["roid", "norm", "norm", "roid"],
		["norm", "nest", "roid", "norm"],
		["norm", "roid", "nest", "norm"],
		["roid", "norm", "norm", "roid"]
	];
	public static xgrid: number = this.layout[0].length;
	public static ygrid: number = this.layout.length;
	public static cellWidth: number = this.width / this.xgrid;
	public static cellHeight: number = this.height / this.ygrid;
	public static gameMode: GameMode = "tdm";
	public static topPlayerID: number = -1;
	private static cellTypes: Map<string, Vector[]> = new Map<string, Vector[]>();

	public static isInside(position: Vector): boolean {
		return position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height;

	}

	public static rebuildTypes(): void {
		this.cellTypes.clear();
		for (let y: number = 0; y < this.ygrid; y++) {
			const row: RoomCellType[] = this.layout[y];
			for (let x: number = 0; x < this.xgrid; x++) {
				const cell: RoomCellType = row[x];
				for (let i: number = 0; i < RoomCellTypes.length; i++) {
					if (cell === RoomCellTypes[i]) {
						const cells = this.cellTypes.get(cell);
						const vector = new Vector(this.cellWidth * (x + 0.5), this.cellHeight * (y + 0.5));
						if (cells === undefined) {
							this.cellTypes.set(cell, [vector]);
						} else {
							cells.push(vector);
						}
					}
				}
			}
		}
	}

	public static getRandom(): Vector {
		return new Vector(this.width * Math.random(), this.height * Math.random());
	}

	public static getRandomType(type: RoomCellType): Vector {
		const cells = this.cellTypes.get(type);
		if (cells === undefined) {
			Logger.warn(`No cell type "${type}" is present in room. Falling back to random position.`);
			return this.getRandom();
		}
		const cell = cells[Math.floor(Math.random() * cells.length)];
		return new Vector(cell.x + (Math.random() - 0.5) * this.cellWidth, cell.y + (Math.random() - 0.5) * this.cellHeight);
	}

	public static isInCell(type: RoomCellType, location: Vector): boolean {
		if (!this.isInside(location)) {
			return false;
		}
		return this.layout[Math.floor(location.y / this.cellHeight)][Math.floor(location.x / this.cellWidth)] === type;
	}
}

Room.rebuildTypes();

Logger.info(`Initialized room ${Room.width}x${Room.height}.`);

class IO {

}

class Skill {

}

class Gun {

}

class Health {

}

class Entity {

}

class Socket {

}

class Nest {

}