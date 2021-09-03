const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

// Define log format to be written
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // set file for saving info level
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30, // for 30 days
            zippedArchive: true,
        }),
        // set file for saving error level
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.error.log`,
            maxFiles: 30, // for 30 days
            zippedArchive: true,
        }),
    ],
});

// For the case not for Production
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            // print with color
            winston.format.colorize(),
            // `${info.level}: ${info.message} JSON.stringify({ ...rest })`
            winston.format.simple(),
        )
    }));
}


module.exports = logger;
