import PLCConnectStrategy from './PLCConnectStrategy';
import PLCReadStrategy from './interfaces/PLCReadStrategy';
import IPLCController from './interfaces/IPLCController';

export default class PLCController implements IPLCController {
  modbus!: PLCConnectStrategy;
  data!: PLCReadStrategy;

  constructor(connection: PLCConnectStrategy, plcReader: PLCReadStrategy) {
    this.modbus = connection;
    this.data = plcReader;
  }

  connect(slaveId: number): boolean {
    return this.modbus.connect(slaveId);
  }

  disconnect(slaveId: number): boolean {
    return this.modbus.disconnect(slaveId);
  }

  testConnection(slaveId: number): boolean {
    return this.modbus.ping(slaveId);
  }

  update(): void {
    // Iterate through all connections using for...in loop
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.modbus.modbusConfigs) {
      if (
        Object.prototype.hasOwnProperty.call(this.modbus.modbusConfigs, key)
      ) {
        const slaveId = parseInt(key, 10); // Convert key to a number if needed
        const connectionData = this.modbus.modbusConfigs[slaveId];
        // Use connectionId and connectionData as needed
        // console.log(
        //   `Connection ID: ${slaveId}, Connection Data:`,
        //   connectionData,
        // );
        // console.log(`Sending update request to PLC ${slaveId}`);
      }
    }
  }
}
