import { StationDataMap, StationInfo } from '../../station/model/StationItem';
import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';

export type SettingsModel = {
  plcConnections: PLCModbusConfig[];
  plcReadConfig: PLCReadConfig;
  autoReconnectPLC: boolean;
  stationInfo: StationInfo;
  stationDataMap: StationDataMap;
};
