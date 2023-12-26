import fs from 'fs';
import path from 'path';
import { PLCModbusConfig } from '../interfaces/PLCUnitsStrategy';
import { SettingsModel } from '../model/SettingsModel';
import ISettingRepository from '../interfaces/ISettingRepository';
import { APP_CONFIG_JSON_PATH } from './constants';
import { isDebug } from '../utils/CommonUtils';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';
import { getAssetPath } from '../../main';
import logger from '../../logger';
import {
  StationDataMap,
  StationHealthCheckConfig,
  StationInfo,
} from '../../station/model/StationItem';

export default class SettingsRepository implements ISettingRepository {
  data!: SettingsModel;
  private settingJsonPath!: string;

  constructor() {
    this.settingJsonPath = getAssetPath(APP_CONFIG_JSON_PATH);
    this.syncDataWithConfigs();
  }

  private syncDataWithConfigs(): void {
    this.data = this.loadFromConfigs();
  }

  private loadFromConfigs(): SettingsModel {
    const json = fs.readFileSync(this.settingJsonPath, 'utf8'); // Read the JSON file synchronously
    const data = JSON.parse(json) as SettingsModel;
    if (isDebug)
      logger.log({
        level: 'debug',
        message: 'Loaded config',
        json: data,
      });
    return data;
  }

  save() {}
  getPlcConnections(): PLCModbusConfig[] {
    return this.data.plcConnections;
  }

  getPlcReadConfig(): PLCReadConfig {
    return this.data.plcReadConfig;
  }

  getStationDataMap(): StationDataMap {
    return this.data.stationDataMap;
  }

  getStationInfo(): StationInfo {
    return this.data.stationInfo;
  }

  getStationHealthCheckConfig(): StationHealthCheckConfig {
    return this.data.healthCheck;
  }
  getBaseBackendURL(): string {
    return this.data.baseBackendURL;
  }
}
