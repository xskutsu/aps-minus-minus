import { Logger, LogLevel } from "./core/logger";

const logger = new Logger("Demo", LogLevel.Verbose);
logger.throw = false;

logger.verbose("Some extra info...");
logger.info("Some info.");
logger.warn("Some warning!");
logger.error("Some error!!!");