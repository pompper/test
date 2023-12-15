import { PLCModbusConfig } from './PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';

export default interface ISettingRepository {
  data: SettingsModel;

  // loadFromConfigs(): void;
  getPlcConnections(): PLCModbusConfig[];
}
