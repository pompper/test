import { LoopEntity } from './LoopEntity';

export default interface IModbusDataUpdater extends LoopEntity {
  initialize(): void;
  listenModbusRead(): void;
}
