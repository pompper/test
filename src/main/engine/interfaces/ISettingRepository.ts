import { PLCModbusConfig } from './PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';
import { PLCReadConfig } from './PLCReadConfig';
import { StationDataMap } from '../../station/model/StationItem';

export default interface ISettingRepository {
  data: SettingsModel;

  // loadFromConfigs(): void;
  getPlcConnections(): PLCModbusConfig[];
  getPlcReadConfig(): PLCReadConfig;
  getStationDataMap(): StationDataMap;
}
