import { BrowserWindow, WebContents, ipcMain } from 'electron';
import winston, { format } from 'winston';
import TransportStream from 'winston-transport';

const { combine, timestamp, label, prettyPrint } = format;
const loggerLevel =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
    ? 'debug'
    : 'info';

const logger = winston.createLogger({
  level: loggerLevel,
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Create a custom Winston transport to send logs to the main process
export class IPCRendererTransport extends TransportStream {
  constructor(private mainWindow: BrowserWindow) {
    super();
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      // ipcMain.emit('log-message', info); // Send log message to main process
      this.emit('logged', info);
      if (
        winston.config.npm.levels[info.level] >= winston.config.npm.levels.debug
      ) {
        this.mainWindow.webContents.send('main:log', info.message);
      }
    });
    callback();
  }
}

export default logger;
