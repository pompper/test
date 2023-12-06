import React, { useEffect, useRef } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterState } from '../features/counter/counterSlice';
import Engine from './Engine';

export default function EngineComponent({
  children,
  reduxStore,
}: {
  children: any;
  reduxStore: EnhancedStore<{
    counter: CounterState;
  }>;
}) {
  const engineRef = useRef<Engine>();

  useEffect(() => {
    const engineInstance = new Engine({ reduxStore });
    engineRef.current = engineInstance;
    // engineInstance.start();

    return () => {
      // engineInstance.stop();
    };
  }, [reduxStore]);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { engineRef }),
      )}
    </div>
  );
}
