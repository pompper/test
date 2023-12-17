import { LoopEntity } from './LoopEntity';

export default interface IModbusUpdater extends LoopEntity {
  initialize(): void;
}
