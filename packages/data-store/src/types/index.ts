// Data Store Types
export interface StoreState {
  [key: string]: any;
}

export interface StoreActions {
  [key: string]: (...args: any[]) => void;
}

export interface StoreConfig<T> {
  name: string;
  initialState: T;
  actions: StoreActions;
  persist?: boolean;
  storage?: 'localStorage' | 'sessionStorage';
}

export interface PersistedStoreConfig<T> extends StoreConfig<T> {
  persist: true;
  storage: 'localStorage' | 'sessionStorage';
  version?: number;
}
