import { PLCModbusConfig } from './PLCUnitsStrategy';
import { SettingsModel } from '../model/SettingsModel';
import { PLCReadConfig } from './PLCReadConfig';
import {
  StationDataMap,
  StationHealthCheckConfig,
  StationInfo,
} from '../../station/model/StationItem';

export default interface ISettingRepository {
  data: SettingsModel;

  // loadFromConfigs(): void;
  getPlcConnections(): PLCModbusConfig[];
  getPlcReadConfig(): PLCReadConfig;
  getStationDataMap(): StationDataMap;
  getStationInfo(): StationInfo;
  getStationHealthCheckConfig(): StationHealthCheckConfig;
  getBaseBackendURL(): string;
}
