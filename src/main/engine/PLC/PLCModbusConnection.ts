import PLCConnectStrategy, {
  PLCModbusConfig,
} from '../interfaces/PLCConnectStrategy';
import ModbusConnectionMaintainer from './ModbusConnectionMaintainer';

export default class PLCModbusConnection implements PLCConnectStrategy {
  modbusConfigs: Record<number, PLCModbusConfig> = {};
  connections: Record<number, ModbusConnectionMaintainer> = {};

  constructor(plcConnections: PLCModbusConfig[]) {
    this.setPLCConntection(plcConnections);
  }

  setPLCConntection(plcConnections: PLCModbusConfig[]) {
    plcConnections.forEach((p, i) => {
      this.modbusConfigs[p.unitId] = p;
      this.connections[p.unitId] = new ModbusConnectionMaintainer(p);
    });
  }

  connect(slaveId: number): boolean {
    throw new Error('Method not implemented.');
  }
  disconnect(slaveId: number): boolean {
    throw new Error('Method not implemented.');
  }
  ping(): boolean {
    throw new Error('Method not implemented.');
  }
}
