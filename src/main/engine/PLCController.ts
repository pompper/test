import PLCConnectStrategy from './PLCConnectStrategy';
import PLCReadStrategy from './PLCReadStrategy';
import IPLCController from './interfaces/IPLCController';

export default class PLCController implements IPLCController {
  connection!: PLCConnectStrategy;
  data!: PLCReadStrategy;

  constructor(connection: PLCConnectStrategy, plcReader: PLCReadStrategy) {
    this.connection = connection;
    this.data = plcReader;
  }

  connect(slaveId: number): boolean {
    return this.connection.connect(slaveId);
  }
  disconnect(slaveId: number): boolean {
    return this.connection.disconnect(slaveId);
  }
  testConnection(slaveId: number): boolean {
    return this.connection.ping(slaveId);
  }
  update(): void {
    // Iterate through all connections using for...in loop
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.connection.plcConnections) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.connection.plcConnections,
          key,
        )
      ) {
        const slaveId = parseInt(key, 10); // Convert key to a number if needed
        const connectionData = this.connection.plcConnections[slaveId];
        // Use connectionId and connectionData as needed
        console.log(
          `Connection ID: ${slaveId}, Connection Data:`,
          connectionData,
        );
        console.log(`Sending update request to PLC ${slaveId}`);
      }
    }
  }
}
