/**
 * Import packages
 */
import winston from 'winston';
const {
  combine,
  colorize,
  timestamp,
  label,
  printf,
  prettyPrint
} = winston.format;

const myFormat = printf(({ level, message, label = 'log', timestamp}) => {
  return `[${timestamp}] <${level}> ${label}: ${message}]`
})

export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    myFormat,
  ),
  transports: [
    new winston.transports.File({ filename: `combined.log` }),
    new winston.transports.File({ filename: `error.log`, level: 'error' }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      myFormat
    )
  }));
}

export default logger;