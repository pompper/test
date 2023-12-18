import IEngineController from '../engine/interfaces/IEngineController';
import { SettingsModel } from '../engine/model/SettingsModel';

export default interface IEngineControllerRendererIPC {
  connect(unitId: number): void;
  ping(unitId: number): void;
  saveSettings(settings: SettingsModel): void;
  getSettings(): Promise<SettingsModel>;
}
