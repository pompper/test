import Engine from './Engine';
import IEngineController from './interfaces/IEngineController';

export default class EngineController implements IEngineController {
  constructor(private engine: Engine) {}

  connect(unitId: number): void {
    this.engine.plc.connect(unitId);
  }
  ping(unitId: number): void {
    this.engine.plc.testConnection(unitId);
  }
}
