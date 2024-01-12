import { StationLiveData } from '../station/model/StationItem';
import Engine from './Engine';
import { ModbusPLCDataModel } from './PLC/ModbusPLCDataModel';
import IEngineController from './interfaces/IEngineController';
import { SettingsModel } from './model/SettingsModel';

export default class EngineController implements IEngineController {
  constructor(private engine: Engine) {}
  getSettings(): SettingsModel {
    return this.engine.settings.data;
  }
  saveSettings(settings: SettingsModel): void {
    throw new Error('Method not implemented.');
  }

  connect(unitId: number): void {
    this.engine.plc.connect(unitId);
  }
  ping(unitId: number): void {
    this.engine.plc.testConnection(unitId);
  }
  getPLCData(unitId: number): ModbusPLCDataModel {
    return this.engine.plc.data.getPLCData(unitId);
  }
  getLiveData(): StationLiveData {
    return this.engine.station.liveData.getInstance();
  }
}
