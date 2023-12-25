import PLCUnitsStrategy from './PLCUnitsStrategy';
import IPLCDataRepository from './IPLCDataRepository';

export default interface IPLCController {
  modbus: PLCUnitsStrategy;
  data: IPLCDataRepository;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  testConnection(slaveId: number): boolean;
  update(): void;
}
