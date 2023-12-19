/* global NodeJS */
import Engine from './Engine';
import { UPDATERLOOP_MIN_INTERVAL_MS } from './data/constants';
import { LoopEntity } from './interfaces/LoopEntity';

export default class UpdaterLoop implements LoopEntity {
  private running!: boolean;
  private intervalMs!: number;
  private loopJobId: NodeJS.Timeout | null = null;

  constructor(private engine: Engine) {
    this.running = false;
    this.intervalMs = 100;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.update();
    }
  }

  public stop(): void {
    this.running = false;
    if (this.loopJobId) {
      clearTimeout(this.loopJobId);
      this.loopJobId = null;
    }
  }

  update(): void {
    if (this.running) {
      this.loopJobId = setTimeout(() => {
        this.engine.update();
        this.update();
      }, this.intervalMs);
    }
  }

  setInterval(ms: number): void {
    if (ms < UPDATERLOOP_MIN_INTERVAL_MS) {
      throw new RangeError(
        `Cannot set interval lower than ${UPDATERLOOP_MIN_INTERVAL_MS} ms`,
      );
    }
    this.intervalMs = ms;
    // if (this.running) {
    //   // Restart the loop with the new delay if it's already running
    //   this.stop();
    //   this.start();
    // }
  }
}
