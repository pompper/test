import PLCUnitsStrategy, {
  PLCModbusConfig,
} from '../interfaces/PLCUnitsStrategy';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';
import ModbusUnit from './ModbusUnit';

export default class PLCModbusConnectionHandler implements PLCUnitsStrategy {
  modbusConfigs: Record<number, PLCModbusConfig> = {};
  units: Record<number, ModbusUnit> = {};

  constructor(plcConnections: PLCModbusConfig[], plcReadConfig: PLCReadConfig) {
    this.setPLCConntection(plcConnections, plcReadConfig);
  }

  setPLCConntection(
    plcConnections: PLCModbusConfig[],
    plcReadConfig: PLCReadConfig,
  ) {
    plcConnections.forEach((p, i) => {
      this.modbusConfigs[p.unitId] = p;
      this.units[p.unitId] = new ModbusUnit(p, plcReadConfig);
    });
  }

  connect(slaveId: number): boolean {
    this.units[slaveId].connect();
    return true;
  }
  disconnect(slaveId: number): boolean {
    throw new Error('Method not implemented.');
  }
  ping(): boolean {
    throw new Error('Method not implemented.');
  }
}
