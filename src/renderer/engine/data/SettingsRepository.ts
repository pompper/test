// import fs from 'fs';
import { PLCConnectInput } from '../PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';
import ISettingRepository from '../interfaces/ISettingRepository';

export default class SettingsRepository implements ISettingRepository {
  data!: SettingsModel;
  settingJsonPath!: string;

  constructor(data?: SettingsModel) {
    this.data = data || {
      plcConnections: [
        {
          host: '192.168.1.101',
          port: 502,
          unitId: 1,
        },
      ],
    };
    this.settingJsonPath = '../configs/appConfigs.json';
  }
  loadFromConfigs(): void {
    throw new Error('Method not implemented.');
  }

  // Updated method to load JSON data from a file
  public loadFromJsonFile(filePath: string): void {
    // try {
    //   const json = fs.readFileSync(filePath, 'utf8'); // Read the JSON file synchronously
    //   console.log(json);
    //   this.data = JSON.parse(json);
    // } catch (error) {
    //   console.error('Error reading or parsing JSON file:', error);
    //   // this.data = null; // Set jsonData to null if there's an error
    // }
  }

  save() {}
  getPlcConnections(): PLCConnectInput[] {
    return this.data.plcConnections;
  }
}
