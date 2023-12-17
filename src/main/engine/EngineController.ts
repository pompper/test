import Engine from './Engine';
import IEngineController from './interfaces/IEngineController';
import { SettingsModel } from './model/SettingsModel';

export default class EngineController implements IEngineController {
  constructor(private engine: Engine) {}
  getSettings(): SettingsModel {
    throw new Error('Method not implemented.');
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
}
