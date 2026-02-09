import { makeStore } from '@/lib/redux/store';

describe('Redux Store', () => {
  it('should create a store with theme reducer', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state.theme).toBeDefined();
  });

  it('should have correct initial theme state', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state.theme.colorScheme).toBe('palette-colors');
    expect(state.theme.mode).toBe('light');
    expect(state.theme.isHydrated).toBe(false);
  });

  it('should create independent store instances', () => {
    const store1 = makeStore();
    const store2 = makeStore();
    expect(store1).not.toBe(store2);
  });
});
