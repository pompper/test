import {
  StationDataMap,
  StationHealthCheckConfig,
  StationInfo,
} from '../../station/model/StationItem';
import { PLCModbusConfig } from '../interfaces/PLCUnitsStrategy';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';

export type SettingsModel = {
  plcConnections: PLCModbusConfig[];
  plcReadConfig: PLCReadConfig;
  autoReconnectPLC: boolean;
  stationInfo: StationInfo;
  stationDataMap: StationDataMap;
  baseBackendURL: string;
  healthCheck: StationHealthCheckConfig;
};
