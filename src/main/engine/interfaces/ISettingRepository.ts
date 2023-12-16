import { PLCModbusConfig } from './PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';
import { PLCReadConfig } from './PLCReadConfig';

export default interface ISettingRepository {
  data: SettingsModel;

  // loadFromConfigs(): void;
  getPlcConnections(): PLCModbusConfig[];
  getPlcReadConfig(): PLCReadConfig;
}
