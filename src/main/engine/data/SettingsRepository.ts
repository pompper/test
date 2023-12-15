import fs from 'fs';
import path from 'path';
import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';
import ISettingRepository from '../interfaces/ISettingRepository';
import { APP_CONFIG_JSON_PATH } from './constants';
import { isDebug } from '../utils/CommonUtils';

export default class SettingsRepository implements ISettingRepository {
  data!: SettingsModel;
  private settingJsonPath!: string;

  constructor() {
    const rootDir = process.cwd();
    this.settingJsonPath = path.join(rootDir, APP_CONFIG_JSON_PATH);
    this.loadConfigs();
  }

  private loadConfigs(): void {
    try {
      const json = fs.readFileSync(this.settingJsonPath, 'utf8'); // Read the JSON file synchronously
      if (isDebug) console.log('loaded configs', json);
      this.data = JSON.parse(json) as SettingsModel;
    } catch (error) {
      console.error('Error reading or parsing JSON file:', error);
      // this.data = null; // Set jsonData to null if there's an error
    }
  }

  save() {}
  getPlcConnections(): PLCModbusConfig[] {
    return this.data.plcConnections;
  }
}
