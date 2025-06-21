import * as fs from "fs";
import * as path from "path";
import { Logger } from "../core/logger";

export enum GSName {
	Reload,
	Recoil,
	Shudder,
	Size,
	Health,
	Damage,
	Pen,
	Speed,
	MaxSpeed,
	Range,
	Density,
	Spray,
	Resistance,
}

export const GSMap: Map<string, Float16Array> = new Map();

const filePath: string = path.resolve("src/server/definitions/gstats.csv");
if (!fs.existsSync(filePath)) {
	Logger.error(`Failed to find CSV file at "${filePath}".`);
}

for (let line of fs.readFileSync(filePath, "utf-8").trim().split(/\r?\n/)) {
	if (line.startsWith("//")) {
		continue;
	}
	const content: string[] = line.split(",");
	if (content.length !== 14) {
		Logger.error(`Gun stat "${content[0]}" has "${content.length} columns instead of 14."`);
	}
	const key: string = content[0];
	if (GSMap.has(key)) {
		Logger.warn(`Duplicate gun stat name "${key}". We'll override it...`);
	}
	const gstat: Float16Array = new Float16Array(13);
	for (let i: number = 1; i < content.length; i++) {
		const raw: string = content[i].trim();
		const value = parseFloat(raw);
		if (isNaN(value)) {
			Logger.error(`NaN value on gun stat "${key}" for "${GSName[i - 1]}".`);
		} else {
			gstat[i - 1] = value;
		}
	}
	GSMap.set(key, gstat);
}

Logger.info(`${GSMap.size} gun stats loaded.`);

export function GSMatrix(gstats: (Float16Array | [GSName, number])[]): Float16Array {
	if (gstats.length < 2) {
		Logger.error("GSMatrix failed to multiply because there was not enough gstats provided.");
	}
	const gstat: Float16Array = new Float16Array(13).fill(1);
	for (let i: number = 0; i < gstats.length; i++) {
		if (gstats[i].length === 2) {
			gstat[gstats[i][0]] *= gstats[i][1];
		} else {
			for (let j = 0; j < 13; j++) {
				gstat[j] *= gstats[i][j];
			}
		}
	}
	return gstat;
}
