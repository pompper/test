import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';

export type SettingsModel = {
  plcConnections: PLCModbusConfig[];
  plcReadConfig: PLCReadConfig;
};
