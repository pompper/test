import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterState, increment } from '../features/counter/counterSlice';

export default class Engine {
  public testValue!: number;

  private readonly reduxStore!: EnhancedStore<{
    counter: CounterState;
  }>;

  constructor({ reduxStore }: { reduxStore: any }) {
    this.testValue = 0;
    this.reduxStore = reduxStore;

    setInterval(() => {
      this.reduxStore.dispatch(increment());
      this.updatePLC();
      console.log('ENGINE', this.testValue);
      console.log('ReduxStore', this.reduxStore.getState().counter);
    }, 1000);
  }

  updatePLC() {
    this.testValue += 1;
  }
}
