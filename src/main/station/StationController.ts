import Engine from '../engine/Engine';
import UpdaterLoop from '../engine/UpdaterLoop';
import { LoopEntity } from '../engine/interfaces/LoopEntity';

export default class StationController implements LoopEntity {
  constructor(private engine: Engine) {}
  update(): void {}
}
