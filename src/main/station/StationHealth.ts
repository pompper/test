import API from '../common/API';
import Engine from '../engine/Engine';
import { LoopEntity } from '../engine/interfaces/LoopEntity';
import { HealthCheckData } from './model/HealthCheckData';
import { StationHealthCheckConfig } from './model/StationItem';

export default class StationHealth implements LoopEntity {
  private isHealthy!: boolean;
  private lastRequestTimestamp: number = Date.now();
  private requestInterval!: number;

  constructor(
    private config: StationHealthCheckConfig,
    private engine: Engine,
  ) {
    this.isHealthy = false;
    this.requestInterval = config.requestInterval;
  }

  set setIsHealthy(value: boolean) {
    this.isHealthy = value;
  }

  get getIsHealthy(): boolean {
    return this.isHealthy;
  }

  private async sendHealthUpdate(): Promise<void> {
    const liveData = this.engine.station.liveData.getInstance();
    const { cabinets } = liveData;
    // mockup
    const healthData: HealthCheckData = {
      id: this.engine.station.info.id,
      stationLiveData: {
        cabinets,
      },
    };
    const response = await API.sendHealthStatus(healthData);
  }

  update(): void {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastRequestTimestamp;

    if (elapsedTime > this.requestInterval) {
      this.lastRequestTimestamp = currentTime;
      this.sendHealthUpdate();
    }
  }
}
