import { Logger } from "../core/logger";
import { Vector } from "../core/vector";

export enum Mode {
	FFA,
	TDM,
}

export enum CellType {
	Normal,
	Nest,
	Roid,
	Rock,
	Base1,
	Base2,
	Base3,
	Base4,
}

export class Room {
	public static parseRoomConfig(rawLayout: string, map: Map<string, CellType>): CellType[][] {
		const output: CellType[][] = [];
		rawLayout = rawLayout.trim();
		for (const rawRow of rawLayout.split("\n")) {
			const row: CellType[] = [];
			for (const cell of rawLayout.split("")) {
				const cellType: CellType | undefined = map.get(cell);
				if (cellType === undefined) {
					Logger.error(`Failed to identify cell type "${cell}" from a room config.`);
				} else {
					row.push(cellType);
				}
			}
			output.push(row);
		}
		return output;
	}

	public lastTickTime: number = performance.now();
	public currentMode: Mode = Mode.FFA;
	public topPlayerId: number = -1;
	public cellCentersMap: Map<CellType, Vector[]> = new Map<CellType, Vector[]>();
	public width: number;
	public height: number;
	public cellLayout: CellType[][];
	public columns: number;
	public rows: number;
	public cellWidth: number;
	public cellHeight: number;
	constructor(width: number, height: number, cellLayout: CellType[][]) {
		this.width = width;
		this.height = height;
		this.cellLayout = cellLayout;
		this.columns = this.cellLayout[0].length;
		this.rows = this.cellLayout.length;
		this.cellWidth = this.width / this.columns;
		this.cellHeight = this.height / this.rows;
	}

	public initializeCellCenters(): void {
		this.cellCentersMap.clear();
		for (let y: number = 0; y < this.rows; y++) {
			const row: CellType[] = this.cellLayout[y];
			for (let x: number = 0; x < this.columns; x++) {
				const type: CellType = row[x];
				const center: Vector = new Vector(this.cellWidth * (x + 0.5), this.cellHeight * (y + 0.5));
				const centers: Vector[] | undefined = this.cellCentersMap.get(type);
				if (centers === undefined) {
					this.cellCentersMap.set(type, [center]);
				} else {
					centers.push(center);
				}
			}
		}
	}

	public getRandom(): Vector {
		return new Vector(this.width * Math.random(), this.height * Math.random());
	}

	public getRandomByType(type: CellType): Vector {
		const centers = this.cellCentersMap.get(type);
		if (centers === undefined) {
			Logger.warn(`Cell type \"${type}\" not found. Using full-range random as fallback.`);
			return this.getRandom();
		}
		const center: Vector = centers[Math.floor(Math.random() * centers.length)];
		return new Vector(center.x + (Math.random() - 0.5) * this.cellWidth, center.y + (Math.random() - 0.5) * this.cellHeight);
	}

	public isWithinBounds(position: Vector): boolean {
		return (position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height);
	}

	public isWithiNCellType(type: CellType, position: Vector): boolean {
		if (!this.isWithinBounds(position)) {
			return false;
		}
		return this.cellLayout[Math.floor(position.y / this.cellHeight)][Math.floor(position.x / this.cellWidth)] === type;
	}
}

export const room = new Room(5000, 5000, Room.parseRoomConfig(`
	n r n n n n r n
	r n n n n n n r
	n n R n n R n n
	n n n N N n n n
	n n n N N n n n
	n n R n n R n n
	r n n n n n n r
	n r n n n n r n
`, new Map([
	["n", CellType.Normal],
	["N", CellType.Nest],
	["r", CellType.Roid],
	["R", CellType.Rock]
])));
room.initializeCellCenters();

Logger.info(`Room initialized.`);