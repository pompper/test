import React, { createContext, useEffect, useMemo, useRef } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterState } from '../features/counter/counterSlice';
import Engine from './Engine';

export const LooperContext = createContext<Engine | null>(null);

export default function EngineProvider({
  children,
  reduxStore,
}: {
  children: any;
  reduxStore: EnhancedStore<{
    counter: CounterState;
  }>;
}) {
  const engineInstance = useMemo(
    () => new Engine({ reduxStore }),
    [reduxStore],
  );

  return (
    <LooperContext.Provider value={engineInstance}>
      {children}
    </LooperContext.Provider>
  );
}
