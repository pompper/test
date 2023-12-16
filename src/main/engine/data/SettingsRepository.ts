import fs from 'fs';
import path from 'path';
import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';
import ISettingRepository from '../interfaces/ISettingRepository';
import { APP_CONFIG_JSON_PATH } from './constants';
import { isDebug } from '../utils/CommonUtils';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';

export default class SettingsRepository implements ISettingRepository {
  data!: SettingsModel;
  private settingJsonPath!: string;

  constructor() {
    const rootDir = process.cwd();
    this.settingJsonPath = path.join(rootDir, APP_CONFIG_JSON_PATH);
    this.setData();
  }

  private setData(): void {
    const data = this.loadFromConfigs();
    if (data) {
      this.data = data;
    }
  }

  private loadFromConfigs(): SettingsModel | null {
    try {
      const json = fs.readFileSync(this.settingJsonPath, 'utf8'); // Read the JSON file synchronously
      if (isDebug) console.log('loaded configs', json);
      return JSON.parse(json) as SettingsModel;
    } catch (error) {
      console.error('Error reading or parsing JSON file:', error);
      return null;
      // this.data = null; // Set jsonData to null if there's an error
    }
  }

  save() {}
  getPlcConnections(): PLCModbusConfig[] {
    return this.data.plcConnections;
  }

  getPlcReadConfig(): PLCReadConfig {
    return this.data.plcReadConfig;
  }
}
