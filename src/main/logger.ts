import { BrowserWindow, WebContents, ipcMain } from 'electron';
import winston, { format } from 'winston';
import TransportStream from 'winston-transport';

const { combine, timestamp, label, prettyPrint } = format;
const logger = winston.createLogger({
  level: 'debug',
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
