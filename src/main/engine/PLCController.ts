import PLCConnectStrategy from './interfaces/PLCConnectStrategy';
import PLCReadStrategy from './interfaces/PLCReadStrategy';
import IPLCController from './interfaces/IPLCController';
import IModbusDataUpdater from './interfaces/IModbusDataUpdater';
import ModbusDataUpdater from './PLC/ModbusDataUpdater';

export default class PLCController implements IPLCController {
  modbus!: PLCConnectStrategy;
  data!: PLCReadStrategy;
  updater!: IModbusDataUpdater;

  constructor(connection: PLCConnectStrategy, plcReader: PLCReadStrategy) {
    this.modbus = connection;
    this.data = plcReader;
    this.updater = new ModbusDataUpdater(this);
    this.updater.initialize();
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
    this.updater.update();

    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.modbus.modbusConfigs) {
      if (
        Object.prototype.hasOwnProperty.call(this.modbus.modbusConfigs, key)
      ) {
        const slaveId = parseInt(key, 10); // Convert key to a number if needed
        const connectionData = this.modbus.modbusConfigs[slaveId];
      }
    }
  }
}
