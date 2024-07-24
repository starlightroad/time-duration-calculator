import { useContext } from 'react';
import { StoreContext } from '../providers/store-provider';

export function useStore() {
  return useContext(StoreContext);
}
