import { LoopEntity } from '../engine/interfaces/LoopEntity';
import { StationHealthCheckConfig } from './model/StationItem';

export default class StationHealth implements LoopEntity {
  private isHealthy!: boolean;
  private lastRequestTimestamp: number = Date.now();
  private requestInterval!: number;

  constructor(private config: StationHealthCheckConfig) {
    this.isHealthy = false;
    this.requestInterval = config.requestInterval;
  }

  set setIsHealthy(value: boolean) {
    this.isHealthy = value;
  }

  get getIsHealthy(): boolean {
    return this.isHealthy;
  }

  update(): void {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastRequestTimestamp;

    if (elapsedTime > this.requestInterval) {
      this.lastRequestTimestamp = currentTime;
      console.log('StationHealth: update');
    }
  }
}
