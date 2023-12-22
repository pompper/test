import { EventEmitter } from 'stream';
import PLCConnectStrategy from './interfaces/PLCConnectStrategy';
import IPLCDataRepository from './interfaces/IPLCDataRepository';
import IPLCController from './interfaces/IPLCController';
import IModbusUpdater from './interfaces/IModbusUpdater';
import ModbusUpdater from './PLC/ModbusDataUpdater';
import Engine from './Engine';

export default class PLCController
  extends EventEmitter
  implements IPLCController
{
  modbus!: PLCConnectStrategy;
  data!: IPLCDataRepository;
  private updater!: IModbusUpdater;

  constructor(
    connection: PLCConnectStrategy,
    plcReader: IPLCDataRepository,
    public engine: Engine,
  ) {
    super();
    this.modbus = connection;
    this.data = plcReader;
    this.updater = new ModbusUpdater(this);
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
  }
}
