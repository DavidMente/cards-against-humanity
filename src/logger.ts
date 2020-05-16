// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createLogger, format, transports } = require('winston');

const { File, Console } = transports;

const winstonLogger = createLogger({
  level: 'info',
});

if (process.env.NODE_ENV === 'production') {

  const fileFormat = format.combine(
    format.timestamp(),
    format.json(),
  );
  const errTransport = new File({
    filename: './logs/error.log',
    format: fileFormat,
    level: 'error',
  });
  const infoTransport = new File({
    filename: './logs/combined.log',
    format: fileFormat,
  });
  winstonLogger.add(errTransport);
  winstonLogger.add(infoTransport);

} else {

  const consoleTransport = new Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  });
  winstonLogger.add(consoleTransport);
}

export const logger = winstonLogger;
