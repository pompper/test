import PLCConnectStrategy from '../PLCConnectStrategy';
import PLCReadStrategy from './PLCReadStrategy';

export default interface IPLCController {
  connection: PLCConnectStrategy;
  data: PLCReadStrategy;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  testConnection(slaveId: number): boolean;
  update(): void;
}
