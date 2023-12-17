export default interface IEngineController {
  connect(unitId: number): void;
  ping(unitId: number): void;
}
