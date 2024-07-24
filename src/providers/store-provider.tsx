import { createContext, Dispatch, useReducer } from 'react';
import { Time } from '../lib/definitions';

type Props = {
  children: React.ReactNode;
};

type Store = {
  calculator: {
    panel: {
      hidden: boolean;
    };
    calculation?: Time;
  };
};

type Action = { type: 'calculated'; time: Time } | { type: 'reset' };

type Context = [state: typeof initialStore, Dispatch<Action>];

const initialStore: Store = {
  calculator: {
    panel: {
      hidden: true,
    },
    calculation: {
      ms: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    },
  },
};

export const StoreContext = createContext<Context>([initialStore, () => {}]);

function storeReducer(store: Store, action: Action): Store {
  const updatedStore = { ...store };

  switch (action.type) {
    case 'reset': {
      updatedStore.calculator.panel.hidden = true;
      updatedStore.calculator.calculation = undefined;
      return updatedStore;
    }
    case 'calculated': {
      updatedStore.calculator.calculation = action.time;
      if (updatedStore.calculator.panel.hidden) {
        updatedStore.calculator.panel.hidden = false;
      }
      return updatedStore;
    }
    default: {
      return store;
    }
  }
}

export default function StoreProvider({ children }: Props) {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return <StoreContext.Provider value={[store, dispatch]}>{children}</StoreContext.Provider>;
}
