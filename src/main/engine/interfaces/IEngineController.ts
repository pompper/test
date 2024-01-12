import { StationLiveData } from '../../station/model/StationItem';
import { ModbusPLCDataModel } from '../PLC/ModbusPLCDataModel';
import { SettingsModel } from '../model/SettingsModel';

export default interface IEngineController {
  connect(unitId: number): void;
  ping(unitId: number): void;
  getSettings(): SettingsModel;
  saveSettings(settings: SettingsModel): void;
  getPLCData(unitId: number): ModbusPLCDataModel;
  getLiveData(): StationLiveData;
}
