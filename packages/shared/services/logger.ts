import winston, { createLogger } from "winston";
import {config} from "../config.ts";

const { combine, timestamp, label, printf } = winston.format;

const format = printf(({ level, message, label, timestamp, obj }) => {
    if (obj) {
        return `${timestamp} [${label}] ${level}: ${message}\n ${JSON.stringify(obj, null, 2)}`;
    }
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export class LoggerService extends winston.Logger {
    constructor(labelMsg: string) {
        const logger = createLogger({
            level: "info",
            format: combine(
                label({ label: labelMsg }),
                timestamp(),
                format
            ),
            transports: [
                new winston.transports.File({ filename: "error.log", level: "error", dirname: config.LOG_PATH }),
                new winston.transports.File({ filename: "combined.log", level: "error", dirname: config.LOG_PATH }),
            ]
        });

        super(logger);

        this.info = logger.info.bind(this);
        this.error = logger.error.bind(this);
        this.warn = logger.warn.bind(this);

        if (Deno.env.get("NODE_ENV") !== "production") {
            this.add(new winston.transports.Console({
                format: combine(
                    label({ label: labelMsg }),
                    timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
                    }),
                    winston.format.colorize(),
                    winston.format.simple(),
                    format
                ),

            }));
        }
    }
}