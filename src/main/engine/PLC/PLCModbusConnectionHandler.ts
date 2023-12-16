import PLCConnectStrategy, {
  PLCModbusConfig,
} from '../interfaces/PLCConnectStrategy';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';
import ModbusConnectionMaintainer from './ModbusConnectionMaintainer';

export default class PLCModbusConnectionHandler implements PLCConnectStrategy {
  modbusConfigs: Record<number, PLCModbusConfig> = {};
  connections: Record<number, ModbusConnectionMaintainer> = {};

  constructor(plcConnections: PLCModbusConfig[], plcReadConfig: PLCReadConfig) {
    this.setPLCConntection(plcConnections, plcReadConfig);
  }

  setPLCConntection(
    plcConnections: PLCModbusConfig[],
    plcReadConfig: PLCReadConfig,
  ) {
    plcConnections.forEach((p, i) => {
      this.modbusConfigs[p.unitId] = p;
      this.connections[p.unitId] = new ModbusConnectionMaintainer(
        p,
        plcReadConfig,
      );
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
