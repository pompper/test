/* global NodeJS */
import Engine from './Engine';
import { LoopEntity } from './LoopEntity';

export default class UpdaterLoop implements LoopEntity {
  private running!: boolean;
  private intervalMs!: number;
  private loopJobId: NodeJS.Timeout | null = null;

  constructor(private engine: Engine) {
    this.running = false;
    this.intervalMs = 500;
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
    const MIN_MS = 50;
    if (ms < MIN_MS) {
      throw new RangeError(`Cannot set interval lower than ${MIN_MS} ms`);
    }
    this.intervalMs = ms;
    // if (this.running) {
    //   // Restart the loop with the new delay if it's already running
    //   this.stop();
    //   this.start();
    // }
  }
}
