import { transports, format } from 'winston';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';

export class Logger {
  public static readonly logger = WinstonModule.createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      }),
      new transports.DailyRotateFile({
        level: 'error',
        filename: 'logs/%DATE%-error.log',
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        handleExceptions: true,
        json: true,
      }),
      new transports.DailyRotateFile({
        filename: 'logs/%DATE%-info.log',
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '14d',
      }),
    ],
  });
}
