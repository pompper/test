import { PLCConnectInput } from '../PLCConnectStrategy';
import { SettingsModel } from '../model/SettingsModel';

export default class SettingsRepository {
  data!: SettingsModel;

  constructor() {
    this.data = {
      plcConnections: [
        {
          host: '192.168.1.101',
          port: 502,
          unitId: 1,
        },
      ],
    };
  }

  save() {}
  getPlcConnections(): PLCConnectInput[] {
    return this.data.plcConnections;
  }
}
