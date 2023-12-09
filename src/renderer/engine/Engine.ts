import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterState, increment } from '../features/counter/counterSlice';
import UpdaterLoop from './UpdaterLoop';
import { LoopEntity } from './LoopEntity';
import MainIpcController from './MainIpcController';

export default class Engine implements LoopEntity {
  public testValue!: number;

  public readonly updaterLoop!: UpdaterLoop;

  public readonly reduxStore!: EnhancedStore<{
    counter: CounterState;
  }>;
  public readonly mainIpc!: MainIpcController;

  constructor({ reduxStore }: { reduxStore: EnhancedStore }) {
    this.testValue = 0;
    this.reduxStore = reduxStore;
    this.mainIpc = new MainIpcController();

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  private updatePLC() {
    this.testValue += 1.5;
    this.reduxStore.dispatch(increment());
  }

  update() {
    this.updatePLC();
  }
}
