import PLCConnectStrategy from './PLCConnectStrategy';
import IPLCDataRepository from './IPLCDataRepository';

export default interface IPLCController {
  modbus: PLCConnectStrategy;
  data: IPLCDataRepository;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  testConnection(slaveId: number): boolean;
  update(): void;
}
