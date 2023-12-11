import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useEngine = (): Engine => {
//   const engineInstance = useContext(LooperContext);
//   if (!engineInstance) {
//     throw new Error('useLooper must be used within a LooperProvider');
//   }
//   return engineInstance;
// };
